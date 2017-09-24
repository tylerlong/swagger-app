import React from 'react'
import PropTypes from 'prop-types'

import { RequestTextField, RequestSelectField, DeleteRequestButton } from '../../containers/Paths/Request'
import { pathType } from '../../utils'

class Request extends React.Component {
  render () {
    console.log(`render Path.Request`)
    const { path, permissions } = this.props
    return (
      <div>
        <DeleteRequestButton path={path} />
        <RequestTextField path={path} name='name' />
        <RequestTextField path={path} name='since' />
        <RequestTextField path={path} name='description' />
        <RequestSelectField path={path} name='method' options={['GET', 'POST', 'PUT', 'DELETE']} />
        <RequestSelectField path={path} name='apiGroup' options={['Light', 'Medium', 'Heavy', 'Auth']} />
        <RequestSelectField path={path} name='permissions' options={permissions} isArray />
      </div>
    )
  }
}

Request.propTypes = {
  path: pathType,
  permissions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default Request
