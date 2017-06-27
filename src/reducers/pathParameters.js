import R from 'ramda'

import { swap, alert } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PATH_PARAMETER':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.append(R.omit(['type'], action))),
        R.set(R.lensPath(['metadata', 'activePathParameterIndex']), state.pathParameters.length),
        alert('success', 'Path parameter added')
      )
    case 'DELETE_PATH_PARAMETER':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.remove(state.metadata.activePathParameterIndex, 1)),
        R.set(R.lensPath(['metadata', 'activePathParameterIndex']), -1),
        alert('success', 'Path parameter deleted')
      )
    case 'MOVE_PATH_PARAMETER_UP':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), swap(state.metadata.activePathParameterIndex, state.metadata.activePathParameterIndex - 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.dec),
        alert('success', 'Path parameter moved up')
      )
    case 'MOVE_PATH_PARAMETER_DOWN':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), swap(state.metadata.activePathParameterIndex, state.metadata.activePathParameterIndex + 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.inc),
        alert('success', 'Path parameter moved down')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
