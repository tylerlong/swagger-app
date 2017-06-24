import { message } from 'antd'

export const addModel = () => (dispatch, getState) => {
  dispatch({ type: 'ADD_MODEL', name: 'Name' })
  dispatch({ type: 'SET_PROP', path: ['metadata', 'activeModelIndex'], value: getState().models.length - 1 }) // make last Collapse panel active
  message.success(`Model added`)
}

export const deleteModel = () => (dispatch, getState) => {
  dispatch({ type: 'DELETE_MODEL' })
  const state = getState()
  if (state.metadata.activeModelIndex === state.models.length) {
    dispatch({ type: 'SET_PROP', path: ['metadata', 'activeModelIndex'], value: state.models.length - 1 }) // make last Collapse panel active
  }
  message.success(`Model deleted`)
}

export const moveModelUp = () => dispatch => {
  dispatch({ type: 'MOVE_MODEL_UP' })
  message.success(`Model moved up`)
}

export const moveModelDown = () => dispatch => {
  dispatch({ type: 'MOVE_MODEL_DOWN' })
  message.success(`Model moved down`)
}
