import { message } from 'antd'

export const addPathParameter = () => (dispatch, getState) => {
  dispatch({ type: 'ADD_PATH_PARAMETER', name: 'Name', description: 'Description', enum: [] })
  dispatch({ type: 'SET_PROP', path: ['metadata', 'activePathParameterIndex'], value: getState().pathParameters.length - 1 }) // make last Collapse panel active
  message.success(`Path parameter added`)
}

export const deletePathParameter = () => (dispatch, getState) => {
  dispatch({ type: 'DELETE_PATH_PARAMETER' })
  const state = getState()
  if (state.metadata.activePathParameterIndex === state.pathParameters.length) {
    dispatch({ type: 'SET_PROP', path: ['metadata', 'activePathParameterIndex'], value: state.pathParameters.length - 1 }) // make last Collapse panel active
  }
  message.success(`Path parameter deleted`)
}

export const movePathParameterUp = () => dispatch => {
  dispatch({ type: 'MOVE_PATH_PARAMETER_UP' })
  message.success(`PathParameter moved up`)
}

export const movePathParameterDown = () => dispatch => {
  dispatch({ type: 'MOVE_PATH_PARAMETER_DOWN' })
  message.success(`PathParameter moved down`)
}
