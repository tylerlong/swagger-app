import R from 'ramda'
import { connect } from 'react-redux'

import Permissions from '../../components/Permissions'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'

const mapStateToProps = ({ permissions }) => ({
  permissions: R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['permissions', index], name, createdAt })),
    orderBy(R.prop('name'))
  )(permissions)
})
export default connect(mapStateToProps, null)(Permissions)

export const AddPermissionButton = connect(
  (state) => ({ name: 'permission' }),
  (dispatch) => ({ add: () => dispatch(addToArray(['permissions'], { name: '🔥 name', description: 'description', createdAt: Date.now() })) })
)(AddButton)
