import React from 'react'

import { PropertyTextField, PropertyTypeSelectField, PropertyCheckboxField, DeletePropertyButton } from '../../containers/Models/Property'
import { pathType } from '../../utils'

class Property extends React.Component {
  render () {
    console.log('render Model.Property')
    const { path } = this.props
    return (
      <div>
        <DeletePropertyButton path={path} />
        <PropertyTextField path={path} name='name' />
        <PropertyTextField path={path} name='description' />
        <PropertyTypeSelectField path={path} name='type' />
        <PropertyTextField path={path} name='enum' isArray />
        <PropertyCheckboxField path={path} name='required' />
        <PropertyCheckboxField path={path} name='isArray' />
      </div>
    )
  }
}

Property.propTypes = {
  path: pathType
}

export default Property
