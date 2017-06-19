import R from 'ramda'

const defaultState = {
  name: '',
  version: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROP':
      return R.set(R.lensProp(action.path), action.value, state)
    case 'SET_STATE':
      return action.state
    default:
      return state
  }
}

export default reducer
