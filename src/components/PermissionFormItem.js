import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePermission } from '../actions'

class FormItem extends React.Component {
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    const permission = this.props.permissions[this.props.index]
    return (
      <div className='permission-form-item'>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={permission.name} onChange={(event) => { this.props.setProp(['permissions', this.props.index, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={permission.description} onChange={(event) => { this.props.setProp(['permissions', this.props.index, 'description'], event.target.value) }} />
        </Form.Item>
        <div className='button-line'>
          <Button disabled={this.props.index === 0}>Move up <Icon type='arrow-up' /></Button>
          <Button disabled={this.props.index === this.props.permissions.length - 1}>Move down <Icon type='arrow-down' /></Button>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={(event) => {
            this.props.deletePermission(this.props.index)
          }}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePermission })(FormItem)
