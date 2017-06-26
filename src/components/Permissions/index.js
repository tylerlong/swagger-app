import React from 'react'
import R from 'ramda'
import { Button, Collapse } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPermission, setProp } from '../../actions'

class Permissions extends React.Component {
  constructor (props) {
    super(props)
    this.setActiveIndex = this.setActiveIndex.bind(this)
  }
  setActiveIndex (key) {
    let activeIndex = -1
    if (key) {
      activeIndex = parseInt(R.last(R.split('-', key)))
    }
    this.props.setProp(['metadata', 'activePermissionIndex'], activeIndex)
  }
  render () {
    const { permissions, metadata, addPermission } = this.props
    return (
      <div>
        <h2>Permissions</h2>
        <Collapse accordion activeKey={`${permissions.length}-${metadata.activePermissionIndex}`} onChange={this.setActiveIndex}>
          {permissions.map((permission, index) => {
            return (
              <Collapse.Panel header={permission.name} key={`${permissions.length}-${index}`}>
                <FormItem index={index} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={addPermission}>Add permission</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addPermission, setProp })(Permissions)
