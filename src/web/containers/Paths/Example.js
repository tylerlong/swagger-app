import * as R from 'ramda'
import { connect } from 'react-redux'

import { TextField, TextAreaField, DeleteButton } from '../../components/Common'
import { deleteFromArray, setProp } from '../../actions'

export const defaultExample = () => ({
  createdAt: Date.now(),
  name: '🔥 name',
  description: '',
  request: '',
  response: ''
})

export const DeletePathRequestExampleButton = connect(
  (state, { path }) => ({
    name: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const PathRequestExampleTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const PathRequestExampleTextAreaField = connect(mapStateToProps, mapDispatchToProps)(TextAreaField)
