export const addPath = () => ({ type: 'ADD_PATH', createdAt: Date.now(), path: '/', requests: [] })

export const deletePath = index => ({ type: 'DELETE_PATH', index })

export const addPathRequest = index => ({ type: 'ADD_PATH_REQUEST', index, props: { name: '🔥 name', description: 'description', method: 'GET', createdAt: Date.now(), since: '', apiGroup: 'Light', permissions: [], batch: false, visibility: 'public', status: 'normal', tags: [], parameters: {}, request: {}, response: {}, examples: [] } })
