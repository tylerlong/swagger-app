import React from 'react'
import R from 'ramda'
import { Input, Form } from 'antd'

import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    console.log(`render Info.FormItem`)
    const { name, value, update } = this.props
    let input = <Input placeholder={name} size='large' value={value} onChange={(event) => { update(event.target.value) }} />
    if (R.contains(name, ['schemes', 'produces', 'consumes'])) {
      input = <Input placeholder='Values separated by commas' size='large' defaultValue={R.join(', ', value)} onChange={(event) => { update(R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
    }
    return (
      <Form.Item {...formItemLayout} label={name}>
        {input}
      </Form.Item>
    )
  }
}

export default FormItem
