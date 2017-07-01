export const addPermission = () => ({ type: 'ADD_PERMISSION', name: 'Name', description: 'Description', createdAt: new Date().getTime() })

export const deletePermission = index => ({ type: 'DELETE_PERMISSION', index })
