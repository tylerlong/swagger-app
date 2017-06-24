import React from 'react'
import R from 'ramda'
import { Form, Button, Collapse } from 'antd'
import { connect } from 'react-redux'

import PermissionFormItem from './PermissionFormItem'
import { addPermission } from '../actions'

class Permissions extends React.Component {
  render () {
    return (
      <div>
        <h2>Permissions</h2>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={this.props.addPermission}>Add permission</Button>
        </div>
        <Form>
          <Collapse accordion>
            {this.props.permissions.map((permission, index) => {
              return (
                <Collapse.Panel header={permission.name} key={`${this.props.permissions.length}-${index}`}>
                  <PermissionFormItem index={index} />
                </Collapse.Panel>
              )
            })}
          </Collapse>
        </Form>
      </div>
    )
  }
}

export default connect(R.identity, { addPermission })(Permissions)
