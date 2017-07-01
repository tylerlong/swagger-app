export const addModel = () => ({ type: 'ADD_MODEL', name: 'Name', createdAt: new Date().getTime() })

export const deleteModel = index => ({ type: 'DELETE_MODEL', index })
