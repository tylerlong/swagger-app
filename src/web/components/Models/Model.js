import React from 'react'
import { Collapse, Card, Row, Col } from 'antd'

import { ModelTextField, DeleteModelButton, AddModelPropertyButton } from '../../containers/Models/Model'
import Property from './Property'

class Model extends React.Component {
  render () {
    console.log(`render Models.Model`)
    const { path, properties } = this.props
    return (
      <div>
        <DeleteModelButton path={path} />
        <ModelTextField path={path} name='name' />
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Properties'>
              <Collapse accordion>
                {properties.map(({ path, name, createdAt }) => {
                  return (
                    <Collapse.Panel header={name} key={createdAt}>
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

export default Model
