import R from 'ramda'

import { alert } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PATH_PARAMETER':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.append(R.omit(['type'], action))),
        alert('success', 'Path parameter added')
      )
    case 'DELETE_PATH_PARAMETER':
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.remove(action.index, 1)),
        alert('success', 'Path parameter deleted')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
