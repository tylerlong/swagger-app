import { connect } from 'react-redux'

import { deleteModelProperty } from '../../actions'
import Property from '../../components/Models/Property'

const mapStateToProps = ({ models }, { index1, index2 }) => ({ name: models[index1].properties[index2].name })
const mapDispatchToProps = (dispatch, { index1, index2 }) => ({
  deleteModelProperty: () => dispatch(deleteModelProperty(index1, index2))
})
export default connect(mapStateToProps, mapDispatchToProps)(Property)
