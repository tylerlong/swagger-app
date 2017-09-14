import R from 'ramda'

import { alert } from '../utils'

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
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
