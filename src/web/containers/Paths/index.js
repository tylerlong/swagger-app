import R from 'ramda'
import { connect } from 'react-redux'

import Paths from '../../components/Paths'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'

const mapStateToProps = ({ paths }) => ({
  paths: R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['paths', index], name, createdAt })),
    orderBy(R.prop('name'))
  )(paths)
})
export default connect(mapStateToProps, null)(Paths)

export const AddPathButton = connect(
  (state) => ({ name: 'path' }),
  (dispatch) => ({ add: () => dispatch(addToArray(['paths'], { name: '🔥 /', createdAt: Date.now(), requests: [] })) })
)(AddButton)
