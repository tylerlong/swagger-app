import R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddPathButton } from '../../containers/Paths'
import Path from '../../containers/Paths/Path'
import { objType } from '../../utils'
import Span from '../../containers/Common/Span'
import { SmartCollapse } from '../Common'

class Paths extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !R.equals(R.map(R.prop('createdAt'), this.props.paths), R.map(R.prop('createdAt'), nextProps.paths))
  }
  render () {
    console.log('render Paths')
    const { paths } = this.props
    return (
      <div>
        <h2>Paths</h2>
        <SmartCollapse>
          {paths.map(({path, createdAt}) => {
            return (
              <Collapse.Panel header={<Span path={path.concat('uri')} />} key={createdAt}>
                <Path path={path} />
              </Collapse.Panel>
            )
          })}
        </SmartCollapse>
        <AddPathButton />
      </div>
    )
  }
}

Paths.propTypes = {
  paths: PropTypes.arrayOf(objType)
}

export default Paths
