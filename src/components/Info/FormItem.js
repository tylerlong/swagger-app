import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    console.log(`render Info.FormItem`)
    const { path, info, setProp } = this.props
    const value = info[path]
    return (
      <Form.Item {...formItemLayout} label={path}>
        <Input placeholder={path} size='large' value={value} onChange={(event) => { setProp(['info', path], event.target.value) }} />
      </Form.Item>
    )
  }
}

export default connect(R.identity, { setProp })(FormItem)
