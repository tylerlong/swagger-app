import R from 'ramda'

const defaultState = {
  name: 'RingCentral API',
  version: '1.0'
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROP':
      return R.set(R.lensProp(action.path), action.value, state)
    default:
      return state
  }
}

export default reducer
