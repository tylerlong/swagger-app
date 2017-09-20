import { connect } from 'react-redux'

import { setProp, deleteModelProperty } from '../../actions'
import Property from '../../components/Models/Property'

const mapStateToProps = ({ models }, { index1, index2 }) => ({ property: models[index1].properties[index2] })
const mapDispatchToProps = (dispatch, { index1, index2 }) => ({
  // todo: remove the line below
  update: (key, value) => dispatch(setProp(['models', index1, 'properties', index2, key], value)),
  deleteModelProperty: () => dispatch(deleteModelProperty(index1, index2))
})
export default connect(mapStateToProps, mapDispatchToProps)(Property)
