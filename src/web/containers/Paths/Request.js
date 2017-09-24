import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import { TextField, SelectField, DeleteButton } from '../../components/Common'
import Request from '../../components/Paths/Request'

export default connect(
  ({ permissions, info: { tags } }) => ({
    permissions: R.map(R.prop('name'), permissions),
    tags
  }), null
)(Request)

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const RequestTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const RequestSelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)

export const DeleteRequestButton = connect(
  (state, { path }) => ({
    componentName: 'request',
    recordName: R.path(path.concat('name'), state)
  }),
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
