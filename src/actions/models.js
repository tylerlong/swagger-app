import R from 'ramda'

export const addModel = R.always({ type: 'ADD_MODEL', name: 'Name' })

export const deleteModel = R.always({ type: 'DELETE_MODEL' })

export const moveModelUp = R.always({ type: 'MOVE_MODEL_UP' })

export const moveModelDown = R.always({ type: 'MOVE_MODEL_DOWN' })
