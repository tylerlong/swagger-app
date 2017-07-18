import R from 'ramda'

import { alert } from '../utils'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PATH':
      return R.pipe(
        R.over(R.lensPath(['paths']), R.append(R.omit(['type'], action))),
        alert('success', 'Path added')
      )
    case 'DELETE_PATH':
      return R.pipe(
        R.over(R.lensPath(['paths']), R.remove(action.index, 1)),
        alert('success', 'Path deleted')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
