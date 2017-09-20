import { connect } from 'react-redux'

import { setProp } from '../../actions'
import TextField from '../../components/Common/TextField'

const mapStateToProps = ({ models }, { index, name }) => ({ value: models[index][name] })
const mapDispatchToProps = (dispatch, { index, name }) => ({
  update: value => dispatch(setProp(['models', index, name], value))
})
export const ModelTextField = connect(mapStateToProps, mapDispatchToProps)(TextField)
