// logics
export const newFile = () => ({ type: 'NEW_FILE' })
export const openFile = () => ({ type: 'OPEN_FILE' })
export const loadState = filePath => ({ type: 'LOAD_STATE', filePath })
export const exportReduxState = () => ({ type: 'EXPORT_REDUX_STATE' })
export const json2yaml = () => ({ type: 'JSON_TO_YAML' })
export const yaml2json = () => ({ type: 'YAML_TO_JSON' })

// reducers
export const setState = state => ({ type: 'SET_STATE', state })
export const setProp = (path, value) => ({ type: 'SET_PROP', path, value })
export const addToArray = (path, obj) => ({ type: 'ADD_TO_ARRAY', path, obj })
export const deleteFromArray = path => ({ type: 'DELETE_FROM_ARRAY', path })
