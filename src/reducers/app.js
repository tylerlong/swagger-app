import R from 'ramda'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROP':
      return R.set(R.lensPath(action.path), action.value, state)
    case 'SET_STATE':
      return action.state
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
