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

export const addPathParameter = () => dispatch => {
  dispatch({ type: 'ADD_PATH_PARAMETER', name: 'Name', description: 'Description', enum: [] })
  message.success(`Path parameter added`)
}

export const deletePathParameter = (index) => dispatch => {
  dispatch({ type: 'DELETE_PATH_PARAMETER', index })
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
