export const addPath = () => ({ type: 'ADD_PATH', createdAt: Date.now() })

export const deletePath = (index) => ({ type: 'DELETE_PATH', index })
