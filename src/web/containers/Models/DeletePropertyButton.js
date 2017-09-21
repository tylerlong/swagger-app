import { connect } from 'react-redux'

import DeleteButton from '../../components/Common/DeleteButton'
import { deleteFromArray } from '../../actions'

const mapStateToProps = ({ models }, { index1, index2 }) => {
  const { name } = models[index1].properties[index2]
  return {
    componentName: 'property',
    recordName: name
  }
}
const mapDispathToProps = (dispatch, { index1, index2 }) => ({
  deleteRecord: () => dispatch(deleteFromArray('models', index1, 'properties', index2))
})
export default connect(mapStateToProps, mapDispathToProps)(DeleteButton)
