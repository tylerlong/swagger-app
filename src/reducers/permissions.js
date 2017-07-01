import R from 'ramda'

import { swap, alert } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PERMISSION':
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.append(R.omit(['type'], action))),
        alert('success', 'Permission added')
      )
    case 'DELETE_PERMISSION':
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.remove(action.index, 1)),
        alert('success', 'Permission deleted')
      )
    case 'MOVE_PERMISSION_UP':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(action.index, action.index - 1)),
        alert('success', 'Permission moved up')
      )
    case 'MOVE_PERMISSION_DOWN':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(action.index, action.index + 1)),
        alert('success', 'Permission moved down')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
