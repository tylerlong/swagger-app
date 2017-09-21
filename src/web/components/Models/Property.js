import React from 'react'

import { PropertyTextField, PropertySelectField, PropertyCheckboxField, DeletePropertyButton } from '../../containers/Models/Property'

class Property extends React.Component {
  render () {
    console.log(`render Models.Model.Property`)
    const { path } = this.props
    return (
      <div>
        <DeletePropertyButton path={path} />
        <PropertyTextField path={path} name='name' />
        <PropertyTextField path={path} name='description' />
        <PropertySelectField path={path} name='type'
          options={['string', 'object', 'integer', 'boolean', 'date-time', 'int64', 'number', 'binary']} />
        <PropertyTextField path={path} name='enum' isArray />
        <PropertyCheckboxField path={path} name='required' />
        <PropertyCheckboxField path={path} name='isArray' />
      </div>
    )
  }
}

export default Property
