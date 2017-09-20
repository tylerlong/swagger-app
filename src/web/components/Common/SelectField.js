import React from 'react'
import { Form, Select } from 'antd'

import { formItemLayout } from '../../utils'

class SelectField extends React.Component {
  render () {
    console.log(`render SelectField`)
    const { name, value, update, options } = this.props
    return (
      <Form.Item {...formItemLayout} label={name}>
        <Select style={{ width: 120 }} value={value} onChange={value => { update(value) }}>
          { options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>) }
        </Select>
      </Form.Item>
    )
  }
}

export default SelectField
