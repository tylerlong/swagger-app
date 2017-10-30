import * as R from 'ramda'

let counter = 0
const generateTimestamp = () => {
  return Date.now() + counter++
}

const extractProperties = properties => {
  return R.pipe(
    R.keys,
    R.map(key => {
      const value = properties[key]
      const result = {
        createdAt: value['x-createdAt'] || generateTimestamp(),
        name: key,
        description: value.description,
        type: value.format || value.type || R.last(value['$ref'].split('/')),
        enum: value.enum || [],
        required: value.required,
        isArray: false
      }
      if (result.type === 'array') {
        result.isArray = true
        result.type = value.items.type || R.last(value.items['$ref'].split('/'))
      }
      return result
    })
  )(properties)
}

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
    pathParameters: (() => {
      if (!R.isNil(swagger.parameters) && !R.isEmpty(swagger.parameters)) {
        return R.pipe(
          R.values,
          R.map(item => ({
            createdAt: item['x-createdAt'] || generateTimestamp(),
            name: item.name,
            description: item.description,
            enum: item.enum || [],
            defaultValue: item.default
          }))
        )(swagger.parameters)
      } else { // arbitrary swagger spec
        return R.pipe(
          R.values,
          R.map(R.pipe(
            R.pick(['get', 'post', 'put', 'delete']),
            R.values,
            R.map(R.pipe(
              R.prop('parameters'),
              R.filter(R.propEq('in', 'path'))
            ))
          )),
          R.flatten,
          R.uniqBy(R.prop('name')),
          R.map(item => ({
            createdAt: item['x-createdAt'] || generateTimestamp(),
            name: item.name,
            description: item.description,
            enum: item.enum || [],
            defaultValue: item.default
          }))
        )(swagger.paths)
      }
    })(),
    paths: R.map(key => {
      const value = swagger.paths[key]
      return { // path
        createdAt: value['x-createdAt'] || generateTimestamp(),
        name: value['x-name'],
        uri: key,
        requests: R.pipe(
          R.pick(value['x-methods'] || ['get', 'post', 'put', 'delete']),
          R.keys,
          R.map(method => {
            const request = value[method]
            return { // request
              createdAt: request['x-createdAt'] || generateTimestamp(),
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
              parameters: R.map(p => { // query parameters
                return {
                  createdAt: p['x-createdAt'] || generateTimestamp(),
                  name: p.name,
                  description: p.description,
                  type: p.format || p.type,
                  enum: p.enum || [],
                  required: p.required,
                  isArray: false
                }
              }, R.filter(p => p.in === 'query', request.parameters || [])),
              request: (body => { // request body
                if (R.isNil(body)) {
                  return []
                }
                const schema = body.schema
                if (R.isNil(schema)) { // fax sending endpoint of https://developer.ringcentral.com/api-explorer/latest/swagger-ring_internal.json
                  return []
                }
                const properties = schema.properties
                if (!R.isNil(properties)) {
                  return extractProperties(properties)
                }
                if (schema.type === 'object' && !R.isNil(schema.enum)) {
                  return [{
                    createdAt: schema['x-createdAt'] || generateTimestamp(),
                    name: schema.title,
                    description: schema.description,
                    type: 'object',
                    enum: R.map(item => R.last(item['$ref'].split('/')), schema.enum),
                    required: schema.required,
                    isArray: false
                  }]
                }
                if (!R.isNil(schema['$ref'])) {
                  return [{
                    createdAt: schema['x-createdAt'] || generateTimestamp(),
                    name: schema.title,
                    description: schema.description,
                    type: R.last(schema['$ref'].split('/')),
                    enum: [],
                    required: schema.required,
                    isArray: false
                  }]
                }
              })(R.find(R.propEq('in', 'body'), request.parameters || [])),
              response: (responses => { // response body
                if (R.isNil(responses)) {
                  return []
                }
                const schema = (responses.default || responses['200']).schema
                if (R.isNil(schema)) {
                  return []
                }
                if (!R.isNil(schema['$ref'])) {
                  const type = R.last(schema['$ref'].split('/'))
                  return [{
                    createdAt: schema['x-createdAt'] || generateTimestamp(),
                    name: schema.title,
                    description: schema.description,
                    type,
                    enum: [],
                    required: schema.required,
                    isArray: false
                  }]
                }
                if (!R.isNil(schema.properties)) {
                  return extractProperties(schema.properties)
                }
              })(request.responses),
              examples: request['x-examples']
            }
          })
        )(value)
      }
    }, R.keys(swagger.paths)),
    models: R.map(key => {
      const value = swagger.definitions[key]
      return {
        createdAt: value['x-createdAt'] || generateTimestamp(),
        name: key,
        properties: R.map(k => {
          const v = value.properties[k]
          const result = {
            createdAt: v['x-createdAt'] || generateTimestamp(),
            name: k,
            description: v.description,
            type: v.format || v.type || R.last(v['$ref'].split('/')),
            enum: v.enum || [],
            required: v.required,
            isArray: false
          }
          if (result.type === 'array') {
            result.isArray = true
            result.type = v.items.type || R.last(v.items['$ref'].split('/'))
          }
          return result
        },
          R.keys(value.properties)
        )
      }
    },
      R.keys(swagger.definitions)
    )
  }
}
