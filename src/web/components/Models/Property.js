import React from 'react'
import { Form, Popconfirm, Button, Icon, Checkbox } from 'antd'

import { formItemLayout } from '../../utils'
import { PropertyTextField, PropertySelectField } from '../../containers/Models/PropertyFields'

class Property extends React.Component {
  render () {
    console.log(`render Models.Model.Property`)
    const { index1, index2, property, update, deleteModelProperty } = this.props
    if (!property) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete property "${property.name}"?`} okText='Yes' cancelText='No' onConfirm={deleteModelProperty}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <PropertyTextField index1={index1} index2={index2} name='name' />
        <PropertyTextField index1={index1} index2={index2} name='description' />
        <PropertySelectField index1={index1} index2={index2} name='type'
          options={['string', 'object', 'integer', 'boolean', 'date-time', 'int64', 'number', 'binary']} />
        <PropertyTextField index1={index1} index2={index2} name='enum' isArray />
        <Form.Item {...formItemLayout} label='Options'>
          <Checkbox checked={property.required} onChange={(event) => { update('required', event.target.checked) }}>Required</Checkbox>
          <Checkbox checked={property.isArray} onChange={(event) => { update('isArray', event.target.checked) }}>Is array</Checkbox>
        </Form.Item>
      </div>
    )
  }
}

export default Property
