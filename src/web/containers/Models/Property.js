import R from 'ramda'
import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import TextField from '../../components/Common/TextField'
import SelectField from '../../components/Common/SelectField'
import CheckboxField from '../../components/Common/CheckboxField'
import DeleteButton from '../../components/Common/DeleteButton'

const mapStateToProps = (state, { path, name }) => ({ value: R.path(path.concat(name), state) })
const mapDispatchToProps = (dispatch, { path, name }) => ({
  update: value => dispatch(setProp(path.concat(name), value))
})
export const PropertyTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const PropertySelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)
export const PropertyCheckboxField = connect(mapStateToProps, mapDispatchToProps)(CheckboxField)

export const DeletePropertyButton = connect(
  (state, { path }) => {
    const { name } = R.path(path, state)
    return {
      componentName: 'property',
      recordName: name
    }
  },
  (dispatch, { path }) => ({
    deleteRecord: () => dispatch(deleteFromArray(path))
  }))(DeleteButton)
