// @flow

export const setProp = (path: string[], value: any) => ({ type: 'SET_PROP', path, value })

export const loadState = () => ({ type: 'LOAD_STATE' })

export const setState = (state: any) => ({ type: 'SET_STATE', state })
