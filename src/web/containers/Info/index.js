import { connect } from 'react-redux'

import { setProp } from '../../actions'
import TextField from '../../components/Common/TextField'

const mapStateToProps = ({ info }, { name }) => ({ value: info[name] })
const mapDispatchToProps = (dispatch, { name }) => ({
  update: value => dispatch(setProp(['info', name], value))
})
export const InfoTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
