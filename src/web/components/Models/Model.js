import * as R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { ModelTextField, DeleteModelButton, AddModelPropertyButton } from '../../containers/Models/Model'
import Property from './Property'
import { pathType, objType } from '../../utils'
import Span from '../../containers/Common/Span'
import { SmartCollapse, CenterPanel } from '../Common'

class Model extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(
      this.props.path === nextProps.path &&
      R.equals(R.map(R.prop('createdAt'), this.props.properties), R.map(R.prop('createdAt'), nextProps.properties))
    )
  }
  render () {
    console.log('render Model')
    const { path, properties } = this.props
    return (
      <div>
        <DeleteModelButton path={path} />
        <ModelTextField path={path} name='name' />
        <CenterPanel>
          <h3>Properties</h3>
          <SmartCollapse>
            {properties.map(({ path, createdAt }) => (
              <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                <Property path={path} />
              </Collapse.Panel>
            ))}
          </SmartCollapse>
          <AddModelPropertyButton path={path} />
        </CenterPanel>
      </div>
    )
  }
}

Model.propTypes = {
  path: pathType,
  properties: PropTypes.arrayOf(objType)
}

export default Model
