import React from 'react'

import { RequestTextField, RequestSelectField, DeleteRequestButton } from '../../containers/Paths/Request'
import { pathType } from '../../utils'

class Request extends React.Component {
  render () {
    console.log(`render Path.Request`)
    const { path } = this.props
    return (
      <div>
        <DeleteRequestButton path={path} />
        <RequestTextField path={path} name='name' />
        <RequestSelectField path={path} name='method' options={['GET', 'POST', 'PUT', 'DELETE']} />
        <RequestTextField path={path} name='description' />
      </div>
    )
  }
}

Request.propTypes = {
  path: pathType
}

export default Request
