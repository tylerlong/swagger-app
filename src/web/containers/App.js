import { connect } from 'react-redux'

import { loadState, toSwaggerJson } from '../actions'
import App from '../components/App'

const mapStateToProps = ({ info: { title, version } }) => ({ title, version })
export default connect(mapStateToProps, { loadState, toSwaggerJson })(App)
