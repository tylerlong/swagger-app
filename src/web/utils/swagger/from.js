import * as R from 'ramda'

export const fromSwagger = swagger => {
  return {
    info: {
      title: swagger.info.title,
      version: swagger.info.version,
      description: swagger.info.description,
      termsOfService: swagger.info.termsOfService,
      host: swagger.host,
      basePath: swagger.basePath,
      schemes: swagger.schemes,
      produces: swagger.produces,
      consumes: swagger.consumes,
      tags: R.pipe(
        R.values,
        R.map(
          R.pipe(
            R.pick(['get', 'post', 'put', 'delete']),
            R.values,
            R.map(R.prop('tags')),
            R.flatten
          )
        ),
        R.flatten,
        R.uniq
      )(swagger.paths).sort()
    },
    permissions: swagger['x-permissions'],
    pathParameters: R.pipe(
      R.values,
      R.map(item => ({
        createdAt: item['x-createdAt'],
        name: item.name,
        description: item.description,
        enum: item.enum || []
      }))
    )(swagger.parameters),
    paths: R.map(key => {
      const value = swagger.paths[key]
      return { // path
        createdAt: value['x-createdAt'],
        uri: key,
        name: value['x-name'],
        requests: R.pipe(
          R.pick(['get', 'post', 'put', 'delete']),
          R.keys,
          R.map(method => {
            const request = value[method]
            return { // request
              createdAt: request['x-createdAt'],
              name: request.summary,
              description: request.description,
              method: method.toUpperCase(),
              tags: request.tags
            }
          })
        )(value)
      }
    }, R.keys(swagger.paths)),
    models: R.map(key => {
      const value = swagger.definitions[key]
      return {
        createdAt: value['x-createdAt'],
        name: key,
        properties: R.map(k => {
          const v = value.properties[k]
          return {
            createdAt: v['x-createdAt'],
            name: k,
            type: v.format || v.type,
            description: v.description,
            enum: v.enum || [],
            required: v.required,
            isArray: v.type === 'array'
          }
        },
          R.keys(value.properties)
        )
      }
    },
      R.keys(swagger.definitions)
    )
  }
}
