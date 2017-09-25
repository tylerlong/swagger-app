import React from 'react'

import { pathType } from '../../utils'
import { DeletePathRequestExampleButton, PathRequestExampleTextField } from '../../containers/Paths/Example'

class Example extends React.Component {
  render () {
    console.log('render Path.Request.Example')
    const { path } = this.props
    return <div>
      <DeletePathRequestExampleButton path={path} />
      <PathRequestExampleTextField path={path} name='name' />
      <PathRequestExampleTextField path={path} name='description' />
    </div>
  }
}

Example.propTypes = {
  path: pathType
}

export default Example
