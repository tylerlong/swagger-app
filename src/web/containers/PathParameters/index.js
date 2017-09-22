import R from 'ramda'
import { connect } from 'react-redux'

import PathParameters from '../../components/PathParameters'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'

const mapStateToProps = ({ pathParameters }) => ({
  pathParameters: R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['pathParameters', index], name, createdAt })),
    orderBy(R.prop('name'))
  )(pathParameters)
})
export default connect(mapStateToProps, null)(PathParameters)

export const AddPathParameterButton = connect(
  state => ({ name: 'path parameter' }),
  dispatch => ({ add: () => dispatch(addToArray(['pathParameters'], { name: '🔥 name', description: 'description', enum: [], createdAt: Date.now() })) })
)(AddButton)
