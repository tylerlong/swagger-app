import R from 'ramda'

export const addPermission = () => (dispatch, getState) => {
  dispatch({ type: 'ADD_PERMISSION', name: 'Name', description: 'Description' })
  dispatch({ type: 'SET_PROP', path: ['metadata', 'activePermissionIndex'], value: getState().permissions.length - 1 }) // make last Collapse panel active
}

export const deletePermission = () => (dispatch, getState) => {
  dispatch({ type: 'DELETE_PERMISSION' })
  const state = getState()
  if (state.metadata.activePermissionIndex === state.permissions.length) {
    dispatch({ type: 'SET_PROP', path: ['metadata', 'activePermissionIndex'], value: state.permissions.length - 1 }) // make last Collapse panel active
  }
}

export const movePermissionUp = R.always({ type: 'MOVE_PERMISSION_UP' })

export const movePermissionDown = R.always({ type: 'MOVE_PERMISSION_DOWN' })
