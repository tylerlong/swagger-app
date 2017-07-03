import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { subFormItemLayout } from '../../utils/components'

class SubFormItem extends React.Component {
  render () {
    const { index1, index2, models, setProp } = this.props
    const prop = models[index1].properties[index2]
    return (
      <div>
        <Form.Item {...subFormItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={prop.name} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={prop.description} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'description'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Type'>
          <Input placeholder='Type' size='large' value={prop.type} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'type'], event.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

export default connect(R.identity, { setProp })(SubFormItem)
