import React from 'react'
import R from 'ramda'
import { Button, Collapse } from 'antd'
import { connect } from 'react-redux'
import dragula from 'dragula'

import FormItem from './FormItem'
import { addPermission, setProp } from '../../actions'

class Permissions extends React.Component {
  componentDidMount () {
    const container = document.querySelector('.ant-collapse')
    dragula([container])
  }
  render () {
    const { permissions, addPermission } = this.props
    return (
      <div>
        <h2>Permissions</h2>
        <Collapse accordion>
          {permissions.map((permission, index) => {
            return (
              <Collapse.Panel header={permission.name} key={`${permission.createdAt}`}>
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
