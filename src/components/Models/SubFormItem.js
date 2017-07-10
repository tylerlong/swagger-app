import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Popconfirm, Button, Icon, Checkbox, Select } from 'antd'

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
          <Select style={{ width: 120 }} value={prop.type} onChange={(value) => { setProp(['models', index1, 'properties', index2, 'type'], value) }}>
            <Select.Option value='string'>string</Select.Option>
            <Select.Option value='object'>object</Select.Option>
            <Select.Option value='integer'>integer</Select.Option>
            <Select.Option value='boolean'>boolean</Select.Option>
            <Select.Option value='date-time'>date-time</Select.Option>
            <Select.Option value='int64'>int64</Select.Option>
            <Select.Option value='number'>number</Select.Option>
            <Select.Option value='binary'>binary</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Enum'>
          <Input placeholder='Enum values separated by commas' size='large' defaultValue={R.join(', ', prop.enum)} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'enum'], R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Options'>
          <Checkbox checked={prop.required} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'required'], event.target.checked) }}>Required</Checkbox>
          <Checkbox checked={prop.isArray} onChange={(event) => { setProp(['models', index1, 'properties', index2, 'isArray'], event.target.checked) }}>Is array</Checkbox>
        </Form.Item>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deleteModelProperty })(SubFormItem)
