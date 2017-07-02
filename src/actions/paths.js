export const addPath = () => ({ type: 'ADD_PATH', createdAt: new Date().getTime() })

export const deletePath = (index) => ({ type: 'DELETE_PATH', index })
