import R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddPermissionButton } from '../../containers/Permissions'
import Permission from './Permission'
import { objType } from '../../utils'

class Permissions extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !R.equals(R.map(R.prop('label'), this.props.permissions), R.map(R.prop('label'), nextProps.permissions))
  }
  render () {
    console.log(`render Permissions`)
    const { permissions } = this.props
    return (
      <div>
        <h2>Permissions</h2>
        <Collapse accordion>
          {permissions.map(({ path, label, createdAt }) => {
            return (
              <Collapse.Panel header={label} key={createdAt}>
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
