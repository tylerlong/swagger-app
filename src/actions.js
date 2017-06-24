import axios from 'axios'
import { message } from 'antd'

export const setProp = (path, value) => ({ type: 'SET_PROP', path, value })

export const loadState = () => async dispatch => {
  const res = await axios.get('./sample.json')
  dispatch({ type: 'SET_STATE', state: res.data })
  message.success(`Data loaded`)
}

export const addPermission = () => (dispatch, getState) => {
  dispatch({ type: 'ADD_PERMISSION', name: 'Permission name', description: 'Permission description' })
  dispatch({ type: 'SET_PROP', path: ['metadata', 'activePermissionIndex'], value: getState().permissions.length - 1 }) // make last Collapse panel active
  message.success(`Permission added`)
}

export const deletePermission = () => (dispatch, getState) => {
  dispatch({ type: 'DELETE_PERMISSION' })
  const state = getState()
  if (state.metadata.activePermissionIndex === state.permissions.length) {
    dispatch({ type: 'SET_PROP', path: ['metadata', 'activePermissionIndex'], value: state.permissions.length - 1 }) // make last Collapse panel active
  }
  message.success(`Permission deleted`)
}

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

export const addPath = () => dispatch => {
  dispatch({ type: 'ADD_PATH' })
  message.success(`Path added`)
}

export const addModel = () => dispatch => {
  dispatch({ type: 'ADD_MODEL' })
  message.success(`Model added`)
}

export const movePermissionUp = () => dispatch => {
  dispatch({ type: 'MOVE_PERMISSION_UP' })
  message.success(`Permission moved up`)
}

export const movePermissionDown = () => dispatch => {
  dispatch({ type: 'MOVE_PERMISSION_DOWN' })
  message.success(`Permission moved down`)
}

export const movePathParameterUp = () => dispatch => {
  dispatch({ type: 'MOVE_PATH_PARAMETER_UP' })
  message.success(`PathParameter moved up`)
}

export const movePathParameterDown = () => dispatch => {
  dispatch({ type: 'MOVE_PATH_PARAMETER_DOWN' })
  message.success(`PathParameter moved down`)
}
