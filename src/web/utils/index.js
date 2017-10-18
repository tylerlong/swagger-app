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
    definitions: {},
    paths: {}
  }
}
