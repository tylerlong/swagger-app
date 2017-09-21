import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import { TextField, DeleteButton } from '../../components/Common'

export const PathParameterTextField = connect(
  (state, { path, name }) => ({ value: R.path(path.concat(name), state) }),
  (dispatch, { path, name }) => ({
    update: value => dispatch(setProp(path.concat(name), value))
  }))(TextField)

export const DeletePathParameterButton = connect(
  (state, { path }) => {
    const { name } = R.path(path, state)
    return {
      componentName: 'path parameter',
      recordName: name
    }
  },
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
