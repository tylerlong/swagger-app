import React from 'react'

import {
  RequestTextField, RequestSelectField,
  DeleteRequestButton, PermissionsSelectField,
  TagsSelectField, RequestCheckboxField
} from '../../containers/Paths/Request'
import { pathType } from '../../utils'

class Request extends React.Component {
  render () {
    console.log(`render Path.Request`)
    const { path } = this.props
    return (
      <div>
        <DeleteRequestButton path={path} />
        <RequestTextField path={path} name='name' />
        <RequestTextField path={path} name='since' />
        <RequestTextField path={path} name='description' />
        <RequestSelectField path={path} name='method' options={['GET', 'POST', 'PUT', 'DELETE']} />
        <RequestSelectField path={path} name='apiGroup' options={['Light', 'Medium', 'Heavy', 'Auth']} />
        <PermissionsSelectField path={path} />
        <TagsSelectField path={path} />
        <RequestSelectField path={path} name='status' options={['Normal', 'Deprecated', 'Disabled']} />
        <RequestSelectField path={path} name='accessLevel' options={['Basic', 'Advanced', 'Internal']} />
        <RequestCheckboxField path={path} name='batch' />
        <RequestCheckboxField path={path} name='beta' />
      </div>
    )
  }
}

Request.propTypes = {
  path: pathType
}

export default Request
