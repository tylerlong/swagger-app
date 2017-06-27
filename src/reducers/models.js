import R from 'ramda'

import { swap, alert } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODEL':
      return R.pipe(
        R.over(R.lensPath(['models']), R.append(R.omit(['type'], action))),
        R.set(R.lensPath(['metadata', 'activeModelIndex']), state.models.length),
        alert('success', 'Model added')
      )
    case 'DELETE_MODEL':
      return R.pipe(
        R.over(R.lensPath(['models']), R.remove(state.metadata.activeModelIndex, 1)),
        R.set(R.lensPath(['metadata', 'activeModelIndex']), -1),
        alert('success', 'Model deleted')
      )
    case 'MOVE_MODEL_UP':
      return R.pipe(
        R.over(R.lensPath(['models']), swap(state.metadata.activeModelIndex, state.metadata.activeModelIndex - 1)),
        R.over(R.lensPath(['metadata', 'activeModelIndex']), R.dec),
        alert('success', 'Model moved up')
      )
    case 'MOVE_MODEL_DOWN':
      return R.pipe(
        R.over(R.lensPath(['models']), swap(state.metadata.activeModelIndex, state.metadata.activeModelIndex + 1)),
        R.over(R.lensPath(['metadata', 'activeModelIndex']), R.inc),
        alert('success', 'Model moved down')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
