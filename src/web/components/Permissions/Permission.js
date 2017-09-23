import React from 'react'

import { PermissionTextField, DeletePermissionButton } from '../../containers/Permissions/Permission'
import { pathType } from '../../utils'

class Permission extends React.Component {
  render () {
    console.log(`render Permission`)
    const { path } = this.props
    return (
      <div>
        <DeletePermissionButton path={path} />
        <PermissionTextField path={path} name='name' />
        <PermissionTextField path={path} name='description' />
      </div>
    )
  }
}

Permission.propTypes = {
  path: pathType
}

export default Permission
