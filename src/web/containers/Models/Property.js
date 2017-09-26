import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import { TextField, SelectField, CheckboxField, DeleteButton } from '../../components/Common'

export const defaultProperty = () => ({
  createdAt: Date.now(),
  name: '🔥 name',
  description: '',
  type: 'string',
  enum: [],
  required: false,
  isArray: false
})

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const PropertyTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const PropertySelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)
export const PropertyCheckboxField = connect(mapStateToProps, mapDispatchToProps)(CheckboxField)

export const DeletePropertyButton = connect(
  (state, { path }) => ({
    componentName: 'property',
    recordName: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
