import * as R from 'ramda'

import { primitiveTypes } from '../common'

const extractProperties = properties => {
  return R.zipObj(R.map(R.prop('name'), properties), R.map(property => {
    const prop = {}
    prop.description = property.description
    prop['x-created-at'] = property.createdAt
    prop.required = property.required
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
  if (response.length === 1 && !R.contains(response[0].type, primitiveTypes) && !response[0].isArray) {
    const item = response[0]
    return {
      'x-created-at': item.createdAt,
      title: item.name,
      description: item.description,
      '$ref': `#/definitions/${item.type}`,
      required: item.required
    }
  }
  if (response.length === 1 && response[0].type === 'object') { // put "/restapi/v1.0/account/{accountId}/extension/{extensionId}"
    return {
      'x-created-at': response[0].createdAt,
      title: response[0].name,
      description: response[0].description,
      required: response[0].required,
      type: 'object',
      enum: response[0].enum.map(item => ({
        '$ref': `#/definitions/${item}`
      }))
    }
  }
  return {
    type: 'object',
    properties: extractProperties(response)
  }
}

const extractRequests = path => {
  const methods = R.map(R.pipe(R.prop('method'), R.toLower), path.requests)
  let result = R.zipObj(methods, R.map(request => {
    // if (request.accessLevel === 'Internal' || request.status !== 'Normal') {
    //   return undefined
    // }
    const temp = {
      'x-created-at': request.createdAt,
      tags: request.tags,
      summary: request.name,
      description: request.description,
      responses: {
        default: {
          description: 'OK',
          schema: extractSchema(request.response)
        }
      },
      parameters: [],
      'x-permissions': request.permissions,
      'x-access-level': request.accessLevel,
      'x-throttling-group': request.throttlingGroup,
      'x-status': request.status,
      'x-since': request.since,
      'x-examples': request.examples,
      'x-beta': request.beta,
      'x-batch': request.batch
    }
    if (request.parameters.length > 0) { // query parameters
      temp.parameters = temp.parameters.concat(request.parameters.map(p => {
        const temp2 = {
          'x-created-at': p.createdAt,
          type: p.type,
          description: p.description,
          name: p.name,
          in: 'query',
          required: p.required
        }
        if (p.enum.length > 0) {
          temp2.enum = p.enum
        }
        if (R.contains(temp2.type, ['date-time', 'binary'])) {
          temp2.format = temp2.type
          temp2.type = 'string'
        }
        if (temp2.type === 'int64') {
          temp2.type = 'integer'
          temp2.format = 'int64'
        }
        return temp2
      }))
    }
    if (request.request.length > 0) { // request body
      temp.parameters.push({
        name: 'body',
        in: 'body',
        schema: extractSchema(request.request)
      })
    }
    if (R.isEmpty(temp.parameters)) {
      delete temp['parameters']
    }
    return temp
  }, path.requests))

  result = R.pickBy((request, key) => request !== undefined, result)

  const pathParameters = R.map(s => s.substring(1, s.length - 1), R.match(/\{.+?\}/g, path.uri))
  if (pathParameters.length > 0) {
    result.parameters = pathParameters.map(pp => ({
      '$ref': `#/parameters/${pp}`
    }))
  }
  result['x-name'] = path.name
  result['x-created-at'] = path.createdAt
  result['x-methods'] = methods
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
    parameters: R.zipObj(R.map(R.prop('name'), state.pathParameters), R.map(pathParameter => {
      const temp = {
        'x-created-at': pathParameter.createdAt,
        name: pathParameter.name,
        in: 'path',
        required: true,
        type: 'string',
        enum: pathParameter.enum,
        description: pathParameter.description,
        default: pathParameter.defaultValue
      }
      if (R.isEmpty(temp.enum)) {
        delete temp['enum']
      }
      return temp
    }, state.pathParameters)),
    definitions: R.zipObj(R.map(R.prop('name'), state.models), R.map(model => ({
      type: 'object',
      'x-created-at': model.createdAt,
      properties: extractProperties(model.properties)
    }), state.models)),
    paths: R.pickBy(
      (val, key) => {
        return !R.isEmpty(val) && !R.equals(R.keys(val), ['parameters'])
      },
      R.zipObj(
        R.map(R.prop('uri'), state.paths),
        R.map(path => extractRequests(path), state.paths)
      )
    ),
    'x-permissions': state.permissions
  }
}
