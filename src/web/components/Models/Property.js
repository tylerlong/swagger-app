import React from 'react'
import R from 'ramda'
import { Input, Form, Popconfirm, Button, Icon, Checkbox, Select } from 'antd'

import { formItemLayout } from '../../utils'

class Property extends React.Component {
  render () {
    console.log(`render Models.Property`)
    const { property, update, deleteModelProperty } = this.props
    if (!property) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete property "${property.name}"?`} okText='Yes' cancelText='No' onConfirm={deleteModelProperty}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={property.name} onChange={(event) => { update('name', event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={property.description} onChange={(event) => { update('description', event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Type'>
          <Select style={{ width: 120 }} value={property.type} onChange={(value) => { update('type', value) }}>
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
        <Form.Item {...formItemLayout} label='Enum'>
          <Input placeholder='Values separated by commas' size='large' defaultValue={R.join(', ', property.enum)} onChange={(event) => { update('enum', R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Options'>
          <Checkbox checked={property.required} onChange={(event) => { update('required', event.target.checked) }}>Required</Checkbox>
          <Checkbox checked={property.isArray} onChange={(event) => { update('isArray', event.target.checked) }}>Is array</Checkbox>
        </Form.Item>
      </div>
    )
  }
}

export default Property
