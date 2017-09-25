import R from 'ramda'
import React from 'react'
import { Row, Col, Collapse } from 'antd'
import PropTypes from 'prop-types'

import {
  RequestTextField, RequestSelectField,
  DeleteRequestButton, PermissionsSelectField,
  TagsSelectField, RequestCheckboxField,
  AddPathRequestExampleButton
} from '../../containers/Paths/Request'
import { pathType, objType } from '../../utils'
import Example from './Example'
import Span from '../../containers/Common/Span'
import { SmartCollapse } from '../Common'

class Request extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(
      this.props.path === nextProps.path &&
      R.equals(R.map(R.prop('createdAt'), this.props.examples), R.map(R.prop('createdAt'), nextProps.examples))
    )
  }
  render () {
    console.log('render Path.Request')
    const { path, examples } = this.props
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
        <Row type='flex' justify='center'>
          <Col xs={24} sm={20}>
            <h4>Examples</h4>
            <SmartCollapse>
              {examples.map(({ path, createdAt }) => {
                return (
                  <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                    <Example path={path} />
                  </Collapse.Panel>
                )
              })}
            </SmartCollapse>
            <AddPathRequestExampleButton path={path} />
          </Col>
        </Row>
      </div>
    )
  }
}

Request.propTypes = {
  path: pathType,
  examples: PropTypes.arrayOf(objType)
}

export default Request
