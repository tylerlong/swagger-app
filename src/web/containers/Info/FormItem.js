import { connect } from 'react-redux'

import { setProp } from '../../actions'
import FormItem from '../../components/Info/FormItem'

const mapStateToProps = ({ info }, { name }) => ({ value: info[name], isArray: name.endsWith('es') })
const mapDispatchToProps = (dispatch, { name }) => ({
  update: (value) => dispatch(setProp(['info', name], value))
})
export default connect(mapStateToProps, mapDispatchToProps)(FormItem)
