export const setProp = (path, value) => ({ type: 'SET_PROP', path, value })

export const setState = (state) => ({ type: 'SET_STATE', state })

export const showAlert = (type, message) => ({ type: 'SHOW_ALERT', alert: { type, message } })

export const loadState = (filePath) => ({ type: 'LOAD_STATE', filePath })
