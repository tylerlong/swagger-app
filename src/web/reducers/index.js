import appReducer from './app'

const reducer = (state, action) => {
  return appReducer(state, action)
}

export default (state, action) => reducer(state, action)(state)
