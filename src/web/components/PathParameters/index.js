import * as R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddPathParameterButton } from '../../containers/PathParameters'
import PathParameter from './PathParameter'
import { objType } from '../../utils'
import Span from '../../containers/Common/Span'
import { SmartCollapse } from '../Common'

class PathParameters extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !R.equals(R.map(R.prop('createdAt'), this.props.pathParameters), R.map(R.prop('createdAt'), nextProps.pathParameters))
  }
  render () {
    console.log('render PathParameters')
    const { pathParameters } = this.props
    return (
      <div>
        <h2>Path Parameters</h2>
        <SmartCollapse>
          {pathParameters.map(({ path, createdAt }) => (
            <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
              <PathParameter path={path} />
            </Collapse.Panel>
          ))}
        </SmartCollapse>
        <AddPathParameterButton />
      </div>
    )
  }
}

PathParameters.propTypes = {
  pathParameters: PropTypes.arrayOf(objType)
}

export default PathParameters
