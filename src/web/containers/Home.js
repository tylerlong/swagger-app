import { connect } from 'react-redux'

import { openFile, newFile } from '../actions'
import Home from '../components/Home'

export default connect(null, { openFile, newFile })(Home)
