import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Popconfirm, Button, Icon, Checkbox } from 'antd'

import { setProp, deleteModelProperty } from '../../actions'
import { subFormItemLayout } from '../../utils'

class SubFormItem extends React.Component {
  render () {
    const { index1, index2, models, setProp, deleteModelProperty } = this.props
    const prop = models[index1].properties[index2]
    return (
      <div>
        <Popconfirm title={`Are you sure to delete property "${prop.name}"?`} okText='Yes' cancelText='No' onConfirm={() => deleteModelProperty(index1, index2)}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...subFormItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={prop.name} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={prop.description} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'description'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Type'>
          <Input placeholder='Type' size='large' value={prop.type} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'type'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Options'>
          <Checkbox onChange={(event) => { setProp(['models', index1, 'properties', index2, 'required'], event.target.checked) }}>Required</Checkbox>
          <Checkbox onChange={(event) => { setProp(['models', index1, 'properties', index2, 'isArray'], event.target.checked) }}>Is array</Checkbox>
        </Form.Item>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deleteModelProperty })(SubFormItem)
