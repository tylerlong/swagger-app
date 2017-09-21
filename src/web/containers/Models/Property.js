import { connect } from 'react-redux'

import { setProp, deleteFromArray } from '../../actions'
import TextField from '../../components/Common/TextField'
import SelectField from '../../components/Common/SelectField'
import CheckboxField from '../../components/Common/CheckboxField'
import DeleteButton from '../../components/Common/DeleteButton'

const mapStateToProps = ({ models }, { index1, index2, name }) => ({ value: models[index1].properties[index2][name] })
const mapDispatchToProps = (dispatch, { index1, index2, name }) => ({
  update: value => dispatch(setProp(['models', index1, 'properties', index2, name], value))
})
export const PropertyTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const PropertySelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)
export const PropertyCheckboxField = connect(mapStateToProps, mapDispatchToProps)(CheckboxField)

export const DeletePropertyButton = connect(
  ({ models }, { index1, index2 }) => {
    const { name } = models[index1].properties[index2]
    return {
      componentName: 'property',
      recordName: name
    }
  },
  (dispatch, { index1, index2 }) => ({
    deleteRecord: () => dispatch(deleteFromArray('models', index1, 'properties', index2))
  }))(DeleteButton)
