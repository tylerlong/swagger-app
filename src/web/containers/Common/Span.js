import * as R from 'ramda'
import { connect } from 'react-redux'

import { Span } from '../../components/Common'

const mapStateToProps = (state, { path }) => ({ text: R.path(path, state) })
export default connect(mapStateToProps, null)(Span)
