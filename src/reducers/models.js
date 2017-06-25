import R from 'ramda'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODEL':
      return R.over(R.lensPath(['models']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_MODEL':
      return R.over(R.lensPath(['models']), R.remove(state.metadata.activeModelIndex, 1), state)
    case 'MOVE_MODEL_UP':
      const modelIndex = state.metadata.activeModelIndex
      const model = state.models[modelIndex]
      return R.pipe(
        R.over(R.lensPath(['models']), R.insert(modelIndex - 1, model)),
        R.over(R.lensPath(['models']), R.remove(modelIndex + 1, 1)),
        R.over(R.lensPath(['metadata', 'activeModelIndex']), R.dec)
      )(state)
    case 'MOVE_MODEL_DOWN':
      const activeModelIndex = state.metadata.activeModelIndex
      const activeModel = state.models[activeModelIndex]
      return R.pipe(
        R.over(R.lensPath(['models']), R.insert(activeModelIndex + 2, activeModel)),
        R.over(R.lensPath(['models']), R.remove(activeModelIndex, 1)),
        R.over(R.lensPath(['metadata', 'activeModelIndex']), R.inc)
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
