import React from 'react'
import { Form, Checkbox } from 'antd'

import { formItemLayout } from '../../utils'

class CheckboxField extends React.Component {
  render () {
    console.log(`render CheckboxField`)
    const { name, value, update } = this.props
    return (
      <Form.Item {...formItemLayout} label={name}>
        <Checkbox checked={value} onChange={event => { update(event.target.checked) }} />
      </Form.Item>
    )
  }
}

export default CheckboxField
