import { connect } from 'react-redux'

import DeleteButton from '../../components/Common/DeleteButton'
import { deleteFromArray } from '../../actions'

const mapStateToProps = ({ models }, { index }) => {
  const { name } = models[index]
  return {
    componentName: 'model',
    recordName: name
  }
}
const mapDispathToProps = (dispatch, { index }) => ({
  deleteRecord: () => dispatch(deleteFromArray('models', index))
})
export default connect(mapStateToProps, mapDispathToProps)(DeleteButton)
