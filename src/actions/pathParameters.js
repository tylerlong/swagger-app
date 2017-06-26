import R from 'ramda'

export const addPathParameter = R.always({ type: 'ADD_PATH_PARAMETER', name: 'Name', description: 'Description', enum: [] })

export const deletePathParameter = R.always({ type: 'DELETE_PATH_PARAMETER' })

export const movePathParameterUp = R.always({ type: 'MOVE_PATH_PARAMETER_UP' })

export const movePathParameterDown = R.always({ type: 'MOVE_PATH_PARAMETER_DOWN' })
