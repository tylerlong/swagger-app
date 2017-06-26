import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePermission, movePermissionUp, movePermissionDown } from '../../actions'
import { formItemLayout } from '../../utils/components'

class FormItem extends React.Component {
  render () {
    const { index, permissions, setProp, deletePermission, movePermissionUp, movePermissionDown } = this.props
    const permission = permissions[index]
    return (
      <div>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={permission.name} onChange={(event) => { setProp(['permissions', index, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={permission.description} onChange={(event) => { setProp(['permissions', index, 'description'], event.target.value) }} />
        </Form.Item>
        <div className='button-line'>
          <Button disabled={index === 0} onClick={movePermissionUp}>Move up <Icon type='arrow-up' /></Button>
          <Button disabled={index === permissions.length - 1} onClick={movePermissionDown}>Move down <Icon type='arrow-down' /></Button>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={deletePermission}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePermission, movePermissionUp, movePermissionDown })(FormItem)
