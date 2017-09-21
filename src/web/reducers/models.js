import R from 'ramda'

import { alert } from '../utils'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODEL':
      return R.pipe(
        R.over(R.lensPath(['models']), R.append(R.omit(['type'], action))),
        alert('success', 'Model added')
      )
    case 'ADD_MODEL_PROPERTY':
      return R.pipe(
        R.over(R.lensPath(action.path.concat('properties')), R.append(action.props)),
        alert('sccess', 'Model property added')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default reducer
