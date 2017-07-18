import React from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePermission } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component<any> {
  render() {
    console.log(`render Permissions.FormItem`)
    const { permission, setProp, deletePermission } = this.props
    if (!permission) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete permission "${permission.name}"?`} okText='Yes' cancelText='No' onConfirm={deletePermission}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={permission.name} onChange={(event: any) => { setProp('name', event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={permission.description} onChange={(event: any) => { setProp('description', event.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

const mapStateToProps = ({ permissions }, { index }) => ({ permission: permissions[index] })
const mapDispatchToProps = (dispatch, { index }) => ({
  deletePermission: () => dispatch(deletePermission(index)),
  setProp: (key, value) => dispatch(setProp(['permissions', index, key], value))
})
export default connect(mapStateToProps, mapDispatchToProps)(FormItem)
