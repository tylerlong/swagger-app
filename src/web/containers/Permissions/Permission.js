import * as R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import { TextField, DeleteButton } from '../../components/Common'

export const defaultPermission = () => ({
  createdAt: Date.now(),
  name: '🔥 name',
  description: ''
})

export const PermissionTextField = connect(
  (state, { path, name }) => ({ value: R.path(path.concat(name), state) }),
  (dispatch, { path, name }) => ({
    update: value => dispatch(setProp(path.concat(name), value))
  }))(TextField)

export const DeletePermissionButton = connect(
  (state, { path }) => ({
    name: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
