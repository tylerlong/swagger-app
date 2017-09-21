import React from 'react'

import { PathParameterTextField, DeletePathParameterButton } from '../../containers/PathParameters/PathParameter'

class PathParameter extends React.Component {
  render () {
    console.log(`render PathParameter`)
    const { path } = this.props
    return (
      <div>
        <DeletePathParameterButton path={path} />
        <PathParameterTextField path={path} name='name' />
        <PathParameterTextField path={path} name='description' />
        <PathParameterTextField path={path} name='enum' isArray />
      </div>
    )
  }
}

export default PathParameter
