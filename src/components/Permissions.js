import React from 'react'
import R from 'ramda'
import { Form, Button } from 'antd'
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
          {this.props.permissions.map((permission, index) => <PermissionFormItem index={index} key={`${this.props.permissions.length}-${index}`} />)}
        </Form>
      </div>
    )
  }
}

export default connect(R.identity, { addPermission })(Permissions)
