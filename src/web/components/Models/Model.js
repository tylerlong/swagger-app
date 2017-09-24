import R from 'ramda'
import React from 'react'
import { Collapse, Card, Row, Col } from 'antd'
import PropTypes from 'prop-types'

import { ModelTextField, DeleteModelButton, AddModelPropertyButton } from '../../containers/Models/Model'
import Property from './Property'
import { pathType, objType } from '../../utils'
import Span from '../../containers/Common/Span'

class Model extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !R.and(
      this.props.path === nextProps.path,
      R.equals(R.map(R.prop('createdAt'), this.props.properties), R.map(R.prop('createdAt'), nextProps.properties))
    )
  }
  render () {
    console.log(`render Model`)
    const { path, properties } = this.props
    return (
      <div>
        <DeleteModelButton path={path} />
        <ModelTextField path={path} name='name' />
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Properties'>
              <Collapse accordion>
                {properties.map(({ path, createdAt }) => {
                  return (
                    <Collapse.Panel header={<Span path={path.concat('name')} />} key={createdAt}>
                      <Property path={path} />
                    </Collapse.Panel>
                  )
                })}
              </Collapse>
              <AddModelPropertyButton path={path} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

Model.propTypes = {
  path: pathType,
  properties: PropTypes.arrayOf(objType)
}

export default Model
