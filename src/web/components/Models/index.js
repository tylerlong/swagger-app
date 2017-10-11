import * as R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddModelButton } from '../../containers/Models'
import Model from '../../containers/Models/Model'
import { objType } from '../../utils'
import Span from '../../containers/Common/Span'
import { SmartCollapse } from '../Common'

class Models extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !R.equals(R.map(R.prop('createdAt'), this.props.models), R.map(R.prop('createdAt'), nextProps.models))
  }
  render () {
    console.log('render Models')
    const { models } = this.props
    return (
      <div>
        <h2>Models</h2>
        <SmartCollapse>
          {models.map(({ path, createdAt }) => (
            <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
              <Model path={path} />
            </Collapse.Panel>
          ))}
        </SmartCollapse>
        <AddModelButton />
      </div>
    )
  }
}

Models.propTypes = {
  models: PropTypes.arrayOf(objType)
}

export default Models
