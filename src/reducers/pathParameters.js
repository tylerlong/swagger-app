import R from 'ramda'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PATH_PARAMETER':
      return R.over(R.lensPath(['pathParameters']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_PATH_PARAMETER':
      return R.over(R.lensPath(['pathParameters']), R.remove(state.metadata.activePathParameterIndex, 1), state)
    case 'MOVE_PATH_PARAMETER_UP':
      const pathParameterIndex = state.metadata.activePathParameterIndex
      const pathParameter = state.pathParameters[pathParameterIndex]
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.insert(pathParameterIndex - 1, pathParameter)),
        R.over(R.lensPath(['pathParameters']), R.remove(pathParameterIndex + 1, 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.dec)
      )(state)
    case 'MOVE_PATH_PARAMETER_DOWN':
      const activePathParameterIndex = state.metadata.activePathParameterIndex
      const activePathParameter = state.pathParameters[activePathParameterIndex]
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.insert(activePathParameterIndex + 2, activePathParameter)),
        R.over(R.lensPath(['pathParameters']), R.remove(activePathParameterIndex, 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.inc)
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
