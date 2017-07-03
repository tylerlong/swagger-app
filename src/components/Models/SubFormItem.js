import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { formItemLayout } from '../../utils/components'

class SubFormItem extends React.Component {
  render () {
    const { index1, index2, models } = this.props
    const prop = models[index1].properties[index2]
    return (
      <Form.Item {...formItemLayout} label='Name' key={prop.createdAt}>
        <Input placeholder='Name' size='large' value={prop.name} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'name'], event.target.value) }} />
      </Form.Item>
    )
  }
}

export default connect(R.identity, {})(SubFormItem)
