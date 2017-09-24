import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddPathParameterButton } from '../../containers/PathParameters'
import PathParameter from './PathParameter'
import { objType } from '../../utils'

class PathParameters extends React.Component {
  render () {
    console.log(`render PathParameters`)
    const { pathParameters } = this.props
    return (
      <div>
        <h2>Path Parameters</h2>
        <Collapse accordion>
          {pathParameters.map(({ path, label, createdAt }) => {
            return (
              <Collapse.Panel header={label} key={createdAt}>
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

PathParameters.propTypes = {
  pathParameters: PropTypes.arrayOf(objType)
}

export default PathParameters
