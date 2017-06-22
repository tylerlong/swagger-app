import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../actions'

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
      </div>
    )
  }
}

export default connect(R.identity, { setProp })(FormItem)