export const addPath = () => ({ type: 'ADD_PATH', createdAt: Date.now(), path: '/', requests: [] })

export const deletePath = (index) => ({ type: 'DELETE_PATH', index })
