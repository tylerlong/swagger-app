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
    return (
      <Form.Item {...formItemLayout} label={this.props.path}>
        <Input placeholder={this.props.path} size='large' value={this.props.info[this.props.path]} onChange={(event) => { this.props.setProp(['info', this.props.path], event.target.value) }} />
      </Form.Item>
    )
  }
}

export default connect(R.identity, { setProp })(FormItem)
