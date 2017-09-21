export const addPermission = () => ({ type: 'ADD_PERMISSION', name: '🔥 name', description: 'description', createdAt: Date.now() })

export const deletePermission = index => ({ type: 'DELETE_PERMISSION', index })
