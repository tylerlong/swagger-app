import R from 'ramda'
import React from 'react'
import { Collapse, Row, Col } from 'antd'
import PropTypes from 'prop-types'

import { PathTextField, DeletePathButton, AddPathRequestButton } from '../../containers/Paths/Path'
import { pathType, objType } from '../../utils'
import Span from '../../containers/Common/Span'
import Request from '../../containers/Paths/Request'
import { SmartCollapse } from '../Common'

class Path extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(
      this.props.path === nextProps.path &&
      R.equals(R.map(R.prop('createdAt'), this.props.requests), R.map(R.prop('createdAt'), nextProps.requests))
    )
  }
  render () {
    console.log('render Path')
    const { path, requests } = this.props
    return (
      <div>
        <DeletePathButton path={path} />
        <PathTextField path={path} name='name' />
        <PathTextField path={path} name='uri' />
        <Row type='flex' justify='center'>
          <Col xs={24} sm={22}>
            <h3>Requests</h3>
            <SmartCollapse>
              {requests.map(({ path, createdAt }) => (
                <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                  <Request path={path} />
                </Collapse.Panel>
              ))}
            </SmartCollapse>
            <AddPathRequestButton path={path} />
          </Col>
        </Row>
      </div>
    )
  }
}

Path.propTypes = {
  path: pathType,
  requests: PropTypes.arrayOf(objType)
}

export default Path
