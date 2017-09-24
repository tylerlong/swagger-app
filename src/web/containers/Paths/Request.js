import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import { TextField, SelectField, DeleteButton, CheckboxField } from '../../components/Common'

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const RequestTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const RequestSelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)
export const RequestCheckboxField = connect(mapStateToProps, mapDispatchToProps)(CheckboxField)

export const PermissionsSelectField = connect((state, { path, name = 'permissions' }) => ({
  value: R.path(path.concat(name), state),
  options: R.map(R.prop('name'), state.permissions),
  name,
  isArray: true
}), (dispatch, { path, name = 'permissions' }) => { return mapDispatchToProps(dispatch, { path, name }) })(SelectField)
export const TagsSelectField = connect((state, { path, name = 'tags' }) => ({
  value: R.path(path.concat(name), state),
  options: state.info.tags,
  name,
  isArray: true
}), (dispatch, { path, name = 'tags' }) => { return mapDispatchToProps(dispatch, { path, name }) })(SelectField)

export const DeleteRequestButton = connect(
  (state, { path }) => ({
    componentName: 'request',
    recordName: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
