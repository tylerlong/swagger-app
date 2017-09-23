import { connect } from 'react-redux'

import { setProp } from '../actions'
import Alerts from '../components/Alerts'

const mapStateToProps = ({ alerts }) => ({ alerts })
const mapDispatchToProps = dispatch => ({ clearAlerts: () => dispatch(setProp(['alerts'], [])) })
export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
