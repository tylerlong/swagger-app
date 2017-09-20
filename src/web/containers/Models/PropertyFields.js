import { connect } from 'react-redux'

import { setProp } from '../../actions'
import TextField from '../../components/Common/TextField'
import SelectField from '../../components/Common/SelectField'

const mapStateToProps = ({ models }, { index1, index2, name }) => ({ value: models[index1].properties[index2][name] })
const mapDispatchToProps = (dispatch, { index1, index2, name }) => ({
  update: value => dispatch(setProp(['models', index1, 'properties', index2, name], value))
})
export const PropertyTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
export const PropertySelectField = connect(mapStateToProps, mapDispatchToProps)(SelectField)
