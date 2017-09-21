import React from 'react'
import { Collapse, Card, Row, Col } from 'antd'

import { ModelTextField, DeleteModelButton, AddModelPropertyButton } from '../../containers/Models/Model'
import Property from './Property'

class Model extends React.Component {
  render () {
    console.log(`render Models.Model`)
    const { index: index1, properties } = this.props
    return (
      <div>
        <DeleteModelButton index={index1} />
        <ModelTextField index={index1} name='name' />
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Properties'>
              <Collapse accordion>
                {properties.map(({ index: index2, name, createdAt }) => {
                  return (
                    <Collapse.Panel header={name} key={createdAt}>
                      <Property index1={index1} index2={index2} />
                    </Collapse.Panel>
                  )
                })}
              </Collapse>
              <AddModelPropertyButton index={index1} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Model
