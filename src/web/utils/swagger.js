import * as R from 'ramda'

import { primitiveTypes } from './common'

const extractProperties = properties => {
  return R.zipObj(R.map(R.prop('name'), properties), R.map(property => {
    const prop = {}
    prop.description = property.description
    if (property.type.toLowerCase() === property.type) { // primitive type
      prop.type = property.type
      if (property.isArray) {
        prop.items = {
          type: prop.type
        }
        prop.type = 'array'
      }
      if (R.contains(prop.type, ['date-time', 'binary'])) {
        prop.format = prop.type
        prop.type = 'string'
      }
      if (prop.type === 'int64') {
        prop.type = 'integer'
        prop.format = 'int64'
      }
    } else { // user defined models
      if (property.isArray) {
        prop.items = { '$ref': `#/definitions/${property.type}` }
        prop.type = 'array'
      } else {
        prop['$ref'] = `#/definitions/${property.type}`
      }
    }
    if (property.enum.length > 0) {
      prop.enum = property.enum
    }
    return prop
  }, properties))
}

const extractSchema = response => {
  if (response.length === 0) {
    return undefined
  }
  if (response.length === 1 && !R.contains(response[0].type, primitiveTypes)) {
    return { '$ref': `#/definitions/${response[0].type}` }
  }
  return {
    type: 'object',
    properties: extractProperties(response)
  }
}

const extractRequests = path => {
  const result = R.zipObj(R.map(R.pipe(R.prop('method'), R.toLower), path.requests), R.map(request => ({
    tags: request.tags,
    description: `${request.name}. ${request.description}`.trim(),
    response: {
      default: {
        description: 'OK',
        schema: extractSchema(request.response)
      }
    }
  }), R.filter(request => {
    return request.accessLevel !== 'Internal' && request.status === 'Normal'
  }, path.requests)))
  const pathParameters = R.map(s => s.substring(1, s.length - 1), R.match(/\{.+?\}/g, path.uri))
  if (pathParameters.length > 0) {
    result.parameters = pathParameters.map(pp => ({
      '$ref': `#/parameters/${pp}`
    }))
  }
  return result
}

export const toSwagger = state => {
  return {
    swagger: '2.0',
    info: {
      version: state.info.version,
      title: state.info.title,
      description: state.info.description,
      termsOfService: state.info.termsOfService
    },
    host: state.info.host,
    basePath: state.info.basePath,
    schemes: state.info.schemes,
    produces: state.info.produces,
    consumes: state.info.consumes,
    parameters: R.zipObj(R.map(R.prop('name'), state.pathParameters), R.map(pathParameter => ({
      name: pathParameter.name,
      in: 'path',
      required: true,
      type: 'string',
      enum: pathParameter.enum,
      description: pathParameter.description,
      default: pathParameter.defaultValue
    }), state.pathParameters)),
    definitions: R.zipObj(R.map(R.prop('name'), state.models), R.map(model => ({
      type: 'object',
      properties: extractProperties(model.properties)
    }), state.models)),
    paths: R.pickBy(
      (val, key) => {
        return !R.isEmpty(val)
      },
      R.zipObj(
        R.map(R.prop('uri'), state.paths),
        R.map(path => extractRequests(path), state.paths)
      )
    )
  }
}
