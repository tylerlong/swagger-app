import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { formItemLayout } from '../../utils/components'

class FormItem extends React.Component {
  render () {
    const path = this.props.path
    const value = this.props.info[path]
    return (
      <Form.Item {...formItemLayout} label={path}>
        <Input placeholder={path} size='large' value={value} onChange={(event) => { this.props.setProp(['info', path], event.target.value) }} />
      </Form.Item>
    )
  }
}

export default connect(R.identity, { setProp })(FormItem)
