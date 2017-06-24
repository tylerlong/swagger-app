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
  activeKey () {
    return `${this.props.permissions.length}-${this.props.metadata.activePermissionIndex}`
  }
  setActiveIndex (key) {
    let activeIndex = -1
    if (key) {
      activeIndex = parseInt(R.last(R.split('-', key)))
    }
    this.props.setProp(['metadata', 'activePermissionIndex'], activeIndex)
  }
  render () {
    return (
      <div>
        <h2>Permissions</h2>
        <Collapse accordion activeKey={this.activeKey()} onChange={this.setActiveIndex}>
          {this.props.permissions.map((permission, index) => {
            return (
              <Collapse.Panel header={permission.name} key={`${this.props.permissions.length}-${index}`}>
                <FormItem index={index} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={this.props.addPermission}>Add permission</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addPermission, setProp })(Permissions)
