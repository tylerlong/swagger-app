export const addModel = () => ({ type: 'ADD_MODEL', name: 'Name', createdAt: new Date().getTime(), properties: [] })

export const deleteModel = index => ({ type: 'DELETE_MODEL', index })

export const addModelProperty = index => ({ type: 'ADD_MODEL_PROPERTY', index, props: { name: 'name', description: 'Description', type: 'string', createdAt: new Date().getTime() } })
