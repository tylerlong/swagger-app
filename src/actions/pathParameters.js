export const addPathParameter = () => ({ type: 'ADD_PATH_PARAMETER', name: 'name', description: 'Description', enum: [], createdAt: new Date().getTime() })

export const deletePathParameter = index => ({ type: 'DELETE_PATH_PARAMETER', index })
