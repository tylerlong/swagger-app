import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddPermissionButton } from '../../containers/Permissions'
import Permission from './Permission'
import { objType } from '../../utils'

class Permissions extends React.Component {
  render () {
    console.log(`render Permissions`)
    const { permissions } = this.props
    return (
      <div>
        <h2>Permissions</h2>
        <Collapse accordion>
          {permissions.map(({ path, name, createdAt }) => {
            return (
              <Collapse.Panel header={name} key={createdAt}>
                <Permission path={path} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <AddPermissionButton />
      </div>
    )
  }
}

Permissions.propTypes = {
  permissions: PropTypes.arrayOf(objType)
}

export default Permissions
