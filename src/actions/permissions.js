export const addPermission = () => ({ type: 'ADD_PERMISSION', name: 'Name', description: 'Description', createdAt: Date.now() })

export const deletePermission = index => ({ type: 'DELETE_PERMISSION', index })
