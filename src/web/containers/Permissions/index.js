import R from 'ramda'
import { connect } from 'react-redux'
import createSelector from 're-reselect'

import Permissions from '../../components/Permissions'
import { orderBy } from '../../utils'
import { addToArray } from '../../actions'
import { AddButton } from '../../components/Common'

const permissionsSelector = createSelector(
  state => state.permissions,
  permissions => R.pipe(
    R.addIndex(R.map)(({ name, createdAt }, index) => ({ path: ['permissions', index], name, createdAt })),
    orderBy(R.prop('name')),
    R.map(R.omit(['name']))
  )(permissions)
)(state => 'permissions')
const mapStateToProps = state => ({ permissions: permissionsSelector(state) })
export default connect(mapStateToProps, null)(Permissions)

export const AddPermissionButton = connect(
  state => ({ name: 'permission' }),
  dispatch => ({ add: () => dispatch(addToArray(['permissions'], { name: '🔥 name', description: '', createdAt: Date.now() })) })
)(AddButton)
