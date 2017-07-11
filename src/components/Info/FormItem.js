import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    console.log(`render Info.FormItem`)
    const { name, info, setProp } = this.props
    const value = info[name]
    return (
      <Form.Item {...formItemLayout} label={name}>
        <Input placeholder={name} size='large' value={value} onChange={(event) => { setProp(['info', name], event.target.value) }} />
      </Form.Item>
    )
  }
}

export default connect(R.pick(['info']), { setProp })(FormItem)
