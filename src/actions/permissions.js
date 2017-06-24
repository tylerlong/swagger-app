import { message } from 'antd'

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

export const movePermissionUp = () => dispatch => {
  dispatch({ type: 'MOVE_PERMISSION_UP' })
  message.success(`Permission moved up`)
}

export const movePermissionDown = () => dispatch => {
  dispatch({ type: 'MOVE_PERMISSION_DOWN' })
  message.success(`Permission moved down`)
}
