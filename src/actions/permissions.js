import R from 'ramda'

export const addPermission = R.always({ type: 'ADD_PERMISSION', name: 'Name', description: 'Description' })

export const deletePermission = R.always({ type: 'DELETE_PERMISSION' })

export const movePermissionUp = R.always({ type: 'MOVE_PERMISSION_UP' })

export const movePermissionDown = R.always({ type: 'MOVE_PERMISSION_DOWN' })
