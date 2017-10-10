import R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import Paths from '../../components/Paths'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'
import { defaultPath } from './Path'

const pathsSelector = createSelector(
  state => state.paths,
  paths => R.pipe(
    R.addIndex(R.map)(({ uri, createdAt }, index) => ({ path: ['paths', index], uri, createdAt })),
    orderBy(R.prop('uri')),
    R.map(R.omit(['uri']))
  )(paths)
)(state => 'paths')
const mapStateToProps = (state) => ({
  paths: pathsSelector(state)
})
export default connect(mapStateToProps, null)(Paths)

export const AddPathButton = connect(
  state => ({ name: 'path' }),
  dispatch => ({
    add: () => dispatch(addToArray(['paths'], defaultPath()))
  })
)(AddButton)
