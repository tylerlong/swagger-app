import R from 'ramda'

import { alert } from '../utils'
import logics from '../logics'

const logicTypes = R.map(R.prop('type'), logics)

export const defaultState = {
  alerts: [],
  info: {
    title: 'Example API',
    version: '1.0',
    description: 'Restful API for Example',
    termsOfService: 'https://www.example.com/terms-of-service',
    host: 'api.example.com',
    basePath: '/',
    schemes: ['https'],
    produces: ['application/json'],
    consumes: ['application/json'],
    tags: []
  },
  permissions: [],
  pathParameters: [],
  paths: [],
  models: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return R.pipe(
        R.always(action.state),
        alert('success', 'Data loaded')
      )
    case 'SET_PROP':
      return R.set(R.lensPath(action.path), action.value)
    case 'ADD_TO_ARRAY':
      return R.pipe(
        R.over(R.lensPath(action.path), R.append(action.obj)),
        alert('success', 'Added')
      )
    case 'DELETE_FROM_ARRAY':
      return R.pipe(
        R.over(R.lensPath(R.init(action.path)), R.remove(R.last(action.path), 1)),
        alert('success', 'Deleted')
      )
    default:
      if (!R.contains(action.type, ['@@redux/INIT'].concat(logicTypes))) {
        console.error(`Unknown action type: ${action.type}`)
      }
      return R.always(state)
  }
}

export default (state, action) => reducer(state, action)(state)
