import R from 'ramda'

import { swap } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PATH_PARAMETER':
      return R.over(R.lensPath(['pathParameters']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_PATH_PARAMETER':
      return R.over(R.lensPath(['pathParameters']), R.remove(state.metadata.activePathParameterIndex, 1), state)
    case 'MOVE_PATH_PARAMETER_UP':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), swap(state.metadata.activePathParameterIndex, state.metadata.activePathParameterIndex - 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.dec)
      )(state)
    case 'MOVE_PATH_PARAMETER_DOWN':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), swap(state.metadata.activePathParameterIndex, state.metadata.activePathParameterIndex + 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.inc)
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
