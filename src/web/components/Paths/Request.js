import * as R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import {
  RequestTextField, RequestSelectField,
  DeleteRequestButton, PermissionsSelectField,
  TagsSelectField, RequestCheckboxField,
  AddPathRequestExampleButton, AddPathRequestQueryParameterButton,
  AddPathRequestRequestFieldButton, AddPathRequestResponseFieldButton
} from '../../containers/Paths/Request'
import { pathType, objType } from '../../utils'
import Example from './Example'
import Span from '../../containers/Common/Span'
import { SmartCollapse, CenterPanel } from '../Common'
import Property from '../Models/Property'

class Request extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(
      this.props.path === nextProps.path &&
      R.equals(R.map(R.prop('createdAt'), this.props.examples), R.map(R.prop('createdAt'), nextProps.examples)) &&
      R.equals(R.map(R.prop('createdAt'), this.props.queryParameters), R.map(R.prop('createdAt'), nextProps.queryParameters)) &&
      R.equals(R.map(R.prop('createdAt'), this.props.requestFields), R.map(R.prop('createdAt'), nextProps.requestFields)) &&
      R.equals(R.map(R.prop('createdAt'), this.props.responseFields), R.map(R.prop('createdAt'), nextProps.responseFields))
    )
  }
  render () {
    console.log('render Path.Request')
    const { path, examples, queryParameters, requestFields, responseFields } = this.props
    return (
      <div>
        <DeleteRequestButton path={path} />
        <CenterPanel>
          <Collapse accordion defaultActiveKey='basic-info'>
            <Collapse.Panel header='Basic Info' key='basic-info'>
              <RequestTextField path={path} name='name' />
              <RequestTextField path={path} name='since' />
              <RequestTextField path={path} name='description' />
              <RequestSelectField path={path} name='method' options={['GET', 'POST', 'PUT', 'DELETE']} />
              <RequestSelectField path={path} name='throttlingGroup' options={['Light', 'Medium', 'Heavy', 'Auth']} />
              <PermissionsSelectField path={path} />
              <TagsSelectField path={path} />
              <RequestSelectField path={path} name='status' options={['Normal', 'Deprecated', 'Disabled']} />
              <RequestSelectField path={path} name='accessLevel' options={['Basic', 'Advanced', 'Internal']} />
              <RequestCheckboxField path={path} name='batch' />
              <RequestCheckboxField path={path} name='beta' />
            </Collapse.Panel>
            <Collapse.Panel header='Query Parameters'>
              <CenterPanel>
                <SmartCollapse>
                  {queryParameters.map(({ path, createdAt }) => (
                    <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                      <Property path={path} />
                    </Collapse.Panel>
                  ))}
                </SmartCollapse>
                <AddPathRequestQueryParameterButton path={path} />
              </CenterPanel>
            </Collapse.Panel>
            <Collapse.Panel header='Request Body'>
              <CenterPanel>
                <SmartCollapse>
                  {requestFields.map(({ path, createdAt }) => (
                    <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                      <Property path={path} />
                    </Collapse.Panel>
                  ))}
                </SmartCollapse>
                <AddPathRequestRequestFieldButton path={path} />
              </CenterPanel>
            </Collapse.Panel>
            <Collapse.Panel header='Response Body'>
              <CenterPanel>
                <SmartCollapse>
                  {responseFields.map(({ path, createdAt }) => (
                    <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                      <Property path={path} />
                    </Collapse.Panel>
                  ))}
                </SmartCollapse>
                <AddPathRequestResponseFieldButton path={path} />
              </CenterPanel>
            </Collapse.Panel>
            <Collapse.Panel header='Examples'>
              <CenterPanel>
                <SmartCollapse>
                  {examples.map(({ path, createdAt }) => (
                    <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                      <Example path={path} />
                    </Collapse.Panel>
                  ))}
                </SmartCollapse>
                <AddPathRequestExampleButton path={path} />
              </CenterPanel>
            </Collapse.Panel>
          </Collapse>
        </CenterPanel>
      </div>
    )
  }
}

Request.propTypes = {
  path: pathType,
  examples: PropTypes.arrayOf(objType),
  queryParameters: PropTypes.arrayOf(objType),
  requestFields: PropTypes.arrayOf(objType),
  responseFields: PropTypes.arrayOf(objType)
}

export default Request
