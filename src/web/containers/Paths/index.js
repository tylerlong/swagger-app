import R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import Paths from '../../components/Paths'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'

const pathsSelector = createSelector(
  state => state.paths,
  paths => R.pipe(
    R.addIndex(R.map)(({ uri, createdAt }, index) => ({ path: ['paths', index], label: uri, createdAt })),
    orderBy(R.prop('label'))
  )(paths)
)(state => 'paths')
const mapStateToProps = (state) => ({
  paths: pathsSelector(state)
})
export default connect(mapStateToProps, null)(Paths)

export const AddPathButton = connect(
  state => ({ name: 'path' }),
  dispatch => ({ add: () => dispatch(addToArray(['paths'], { name: 'name', uri: '🔥 /', createdAt: Date.now(), requests: [] })) })
)(AddButton)
