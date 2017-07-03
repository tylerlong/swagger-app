import R from 'ramda'

import { alert } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODEL':
      return R.pipe(
        R.over(R.lensPath(['models']), R.append(R.omit(['type'], action))),
        alert('success', 'Model added')
      )
    case 'DELETE_MODEL':
      return R.pipe(
        R.over(R.lensPath(['models']), R.remove(action.index, 1)),
        alert('success', 'Model deleted')
      )
    case 'ADD_MODEL_PROPERTY':
      return R.pipe(
        R.over(R.lensPath(['models', action.index, 'properties']), R.append(action.props)),
        alert('sccess', 'Model property added')
      )
    case 'DELETE_MODEL_PROPERTY':
      console.log('DELETE_MODEL_PROPERTY')
      return R.pipe(
        R.over(R.lensPath(['models', action.index1, 'properties']), R.remove(action.index2, 1)),
        alert('sccess', 'Model property deleted')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
