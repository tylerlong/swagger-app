import React from 'react'
import { Popconfirm, Button, Icon } from 'antd'

import { PropertyTextField, PropertySelectField, PropertyCheckboxField } from '../../containers/Models/PropertyFields'

class Property extends React.Component {
  render () {
    console.log(`render Models.Model.Property`)
    const { index1, index2, property, deleteModelProperty } = this.props
    if (!property) {
      return null
    }
    return (
      <div>
        {/* todo: Move Popconfirm to components/Common */}
        <Popconfirm title={`Are you sure to delete property "${property.name}"?`} okText='Yes' cancelText='No' onConfirm={deleteModelProperty}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <PropertyTextField index1={index1} index2={index2} name='name' />
        <PropertyTextField index1={index1} index2={index2} name='description' />
        <PropertySelectField index1={index1} index2={index2} name='type'
          options={['string', 'object', 'integer', 'boolean', 'date-time', 'int64', 'number', 'binary']} />
        <PropertyTextField index1={index1} index2={index2} name='enum' isArray />
        <PropertyCheckboxField index1={index1} index2={index2} name='required' />
        <PropertyCheckboxField index1={index1} index2={index2} name='isArray' />
      </div>
    )
  }
}

export default Property
