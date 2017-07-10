export const addPath = () => ({ type: 'ADD_PATH', createdAt: Date.now(), path: '/', methods: [] })

export const deletePath = (index) => ({ type: 'DELETE_PATH', index })
