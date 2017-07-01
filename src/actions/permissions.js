export const addPermission = () => ({ type: 'ADD_PERMISSION', name: 'Name', description: 'Description', createdAt: new Date().getTime() })

export const deletePermission = index => ({ type: 'DELETE_PERMISSION', index })

export const movePermissionUp = index => ({ type: 'MOVE_PERMISSION_UP', index })

export const movePermissionDown = index => ({ type: 'MOVE_PERMISSION_DOWN', index })
