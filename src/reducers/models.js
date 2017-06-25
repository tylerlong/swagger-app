import R from 'ramda'

import { swap } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODEL':
      return R.over(R.lensPath(['models']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_MODEL':
      return R.over(R.lensPath(['models']), R.remove(state.metadata.activeModelIndex, 1), state)
    case 'MOVE_MODEL_UP':
      return R.pipe(
        R.over(R.lensPath(['models']), swap(state.metadata.activeModelIndex, state.metadata.activeModelIndex - 1)),
        R.over(R.lensPath(['metadata', 'activeModelIndex']), R.dec)
      )(state)
    case 'MOVE_MODEL_DOWN':
      return R.pipe(
        R.over(R.lensPath(['models']), swap(state.metadata.activeModelIndex, state.metadata.activeModelIndex + 1)),
        R.over(R.lensPath(['metadata', 'activeModelIndex']), R.inc)
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
