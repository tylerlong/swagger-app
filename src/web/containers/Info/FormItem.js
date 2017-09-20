import { connect } from 'react-redux'

import { setProp } from '../../actions'
import TextField from '../../components/Common/TextField'

const mapStateToProps = ({ info }, { name }) => ({ value: info[name], isArray: name.endsWith('es') })
const mapDispatchToProps = (dispatch, { name }) => ({
  update: value => dispatch(setProp(['info', name], value))
})
export default connect(mapStateToProps, mapDispatchToProps)(TextField)
