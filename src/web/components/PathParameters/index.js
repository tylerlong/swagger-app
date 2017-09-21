import React from 'react'
import { Collapse } from 'antd'

import { AddPathParameterButton } from '../../containers/PathParameters'
import PathParameter from './PathParameter'

class PathParameters extends React.Component {
  render () {
    console.log(`render PathParameters`)
    const { pathParameters } = this.props
    return (
      <div>
        <h2>Path Parameters</h2>
        <Collapse accordion>
          {pathParameters.map(({ path, name, createdAt }) => {
            return (
              <Collapse.Panel header={name} key={createdAt}>
                <PathParameter path={path} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <AddPathParameterButton />
      </div>
    )
  }
}

export default PathParameters
