import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePermission } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    console.log(`render Permissions.FormItem`)
    const { index, permissions, setProp, deletePermission } = this.props
    const permission = permissions[index]
    if (!permission) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete permission "${permission.name}"?`} okText='Yes' cancelText='No' onConfirm={() => deletePermission(index)}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={permission.name} onChange={(event) => { setProp(['permissions', index, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={permission.description} onChange={(event) => { setProp(['permissions', index, 'description'], event.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePermission })(FormItem)
