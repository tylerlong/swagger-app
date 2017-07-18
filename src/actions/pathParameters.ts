export const addPathParameter = () => ({ type: 'ADD_PATH_PARAMETER', name: 'name', description: 'Description', enum: [], createdAt: Date.now() })

export const deletePathParameter = index => ({ type: 'DELETE_PATH_PARAMETER', index })
