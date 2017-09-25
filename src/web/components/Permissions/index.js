import R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddPermissionButton } from '../../containers/Permissions'
import Permission from './Permission'
import { objType } from '../../utils'
import Span from '../../containers/Common/Span'
import { SmartCollapse } from '../Common'

class Permissions extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !R.equals(R.map(R.prop('createdAt'), this.props.permissions), R.map(R.prop('createdAt'), nextProps.permissions))
  }
  render () {
    console.log('render Permissions')
    const { permissions } = this.props
    return (
      <div>
        <h2>Permissions</h2>
        <SmartCollapse>
          {permissions.map(({ path, createdAt }) => {
            return (
              <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                <Permission path={path} />
              </Collapse.Panel>
            )
          })}
        </SmartCollapse>
        <AddPermissionButton />
      </div>
    )
  }
}

Permissions.propTypes = {
  permissions: PropTypes.arrayOf(objType)
}

export default Permissions
