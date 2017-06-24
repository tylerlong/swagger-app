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

export const deletePermission = (index) => dispatch => {
  dispatch({ type: 'DELETE_PERMISSION', index })
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
