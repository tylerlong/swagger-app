import { connect } from 'react-redux'

import { setProp, deleteModel, addModelProperty } from '../../actions'
import Model from '../../components/Models/Model'

const mapStateToProps = ({ models }, { index }) => ({ model: models[index] })
const mapDispathToProps = (dispatch, { index }) => ({
  setProp: (key, value) => dispatch(setProp(['models', index, key], value)),
  deleteModel: () => dispatch(deleteModel(index)),
  addModelProperty: () => dispatch(addModelProperty(index))
})
export default connect(mapStateToProps, mapDispathToProps)(Model)
