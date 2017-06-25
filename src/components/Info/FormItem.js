import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { formItemLayout } from '../../utils/components'

class FormItem extends React.Component {
  render () {
    return (
      <Form.Item {...formItemLayout} label={this.props.path}>
        <Input placeholder={this.props.path} size='large' value={this.props.info[this.props.path]} onChange={(event) => { this.props.setProp(['info', this.props.path], event.target.value) }} />
      </Form.Item>
    )
  }
}

export default connect(R.identity, { setProp })(FormItem)
