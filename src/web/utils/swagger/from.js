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
        enum: item.enum || [],
        defaultValue: item.default
      }))
    )(swagger.parameters),
    paths: R.map(key => {
      const value = swagger.paths[key]
      return { // path
        createdAt: value['x-createdAt'],
        name: value['x-name'],
        uri: key,
        requests: R.pipe(
          R.pick(['get', 'post', 'put', 'delete']),
          R.keys,
          R.map(method => {
            const request = value[method]
            return { // request
              createdAt: request['x-createdAt'],
              name: request.summary,
              since: request['x-since'],
              description: request.description,
              method: method.toUpperCase(),
              apiGroup: request['x-apiGroup'],
              permissions: request['x-permissions'],
              tags: request.tags,
              status: request['x-status'],
              accessLevel: request['x-accessLevel'],
              batch: request['x-batch'],
              beta: request['x-beta'],
              parameters: request.parameters || [],
              request: request.request || [],
              response: ((schema) => {
                if (R.isNil(schema)) {
                  return []
                }
                if (!R.isNil(schema['$ref'])) {
                  const type = R.last(schema['$ref'].split('/'))
                  return [{
                    createdAt: schema['x-createdAt'],
                    name: schema['x-name'],
                    description: schema['x-description'],
                    type,
                    enum: [],
                    required: true,
                    isArray: false
                  }]
                }
              })(request.responses.default.schema),
              examples: request['x-examples']
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
