export const addModel = () => ({ type: 'ADD_MODEL', name: 'Name', createdAt: Date.now(), properties: [] })

export const addModelProperty = index => ({ type: 'ADD_MODEL_PROPERTY', index, props: { name: 'name', description: 'description', type: 'string', createdAt: Date.now(), enum: [], isArray: false, required: false } })
