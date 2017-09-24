import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import { TextField, SelectField, DeleteButton } from '../../components/Common'

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const RequestTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const RequestSelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)
export const PermissionsSelectField = connect((state, { path, name }) => ({
  value: R.path(path.concat(name), state),
  options: R.map(R.prop('name'), state.permissions),
  isArray: true
}), mapDispatchToProps)(SelectField)
export const TagsSelectField = connect((state, { path, name }) => ({
  value: R.path(path.concat(name), state),
  options: state.info.tags,
  isArray: true
}), mapDispatchToProps)(SelectField)

export const DeleteRequestButton = connect(
  (state, { path }) => ({
    componentName: 'request',
    recordName: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
