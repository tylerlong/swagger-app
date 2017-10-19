import * as R from 'ramda'
import PropTypes from 'prop-types'

export const alert = R.curry((type, message) => {
  if (R.complement(R.contains)(type, ['success', 'info', 'warning', 'error'])) {
    throw TypeError('Unknown alert type')
  }
  if (R.either(R.complement(R.is(String)), R.isEmpty)(message)) {
    return R.identity
  }
  return R.over(R.lensPath(['alerts']), R.append({ type, message }))
})

// Order by selector toString, ignore case
export const orderBy = R.curry((selector, objects) => {
  return R.sort(R.comparator((a, b) => R.toLower(selector(a).toString()) < R.toLower(selector(b).toString())), objects)
})

// Usage example: redirectTo('/edit/xxxx')
export const redirectTo = path => {
  window.location = [window.location.href.split('#')[0], path].join('#')
}

// For propTypes check
export const pathType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]).isRequired
).isRequired
export const objType = PropTypes.shape({
  path: pathType,
  createdAt: PropTypes.number.isRequired
}).isRequired

const extractProperties = (model) => {
  return R.zipObj(R.map(R.prop('name'), model.properties), R.map(property => {
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
  }, model.properties))
}

const extractSchema = (request) => {
  return {}
}

const extractRequests = (path) => {
  return R.zipObj(R.map(R.pipe(R.prop('method'), R.toLower), path.requests), R.map(request => ({
    tags: request.tags,
    description: request.description,
    response: { default: {
      description: 'OK',
      schema: extractSchema(request)
    }}
  }), path.requests))
}

export const toSwagger = (state) => {
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
      properties: extractProperties(model)
    }), state.models)),
    paths: R.zipObj(R.map(R.prop('uri'), state.paths), R.map(path => extractRequests(path), state.paths))
  }
}
