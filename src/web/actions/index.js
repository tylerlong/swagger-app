// home
export const newFile = () => ({ type: 'NEW_FILE' })
export const openFile = () => ({ type: 'OPEN_FILE' })

// app
export const loadState = filePath => ({ type: 'LOAD_STATE', filePath })
export const setState = state => ({ type: 'SET_STATE', state })
export const setProp = (path, value) => ({ type: 'SET_PROP', path, value })
export const deleteFromArray = path => ({ type: 'DELETE_FROM_ARRAY', path })
export const addToArray = (path, obj) => ({ type: 'ADD_TO_ARRAY', path, obj })
export const showAlert = (type, message) => ({ type: 'SHOW_ALERT', alert: { type, message } })
