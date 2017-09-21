import React from 'react'

import { PropertyTextField, PropertySelectField, PropertyCheckboxField, DeletePropertyButton } from '../../containers/Models/Property'

class Property extends React.Component {
  render () {
    console.log(`render Models.Model.Property`)
    const { index1, index2 } = this.props
    return (
      <div>
        <DeletePropertyButton index1={index1} index2={index2} />
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
