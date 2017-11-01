import { connect } from 'react-redux'

import { openFile, newFile, json2yaml } from '../actions'
import Home from '../components/Home'

export default connect(null, { openFile, newFile, json2yaml })(Home)
