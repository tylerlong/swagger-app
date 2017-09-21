import React from 'react'
import { Button, Collapse, Card, Row, Col, Icon } from 'antd'

import Property from './Property'
import DeleteModelButton from '../../containers/Models/DeleteModelButton'
import { ModelTextField } from '../../containers/Models/ModelFields'

class Model extends React.Component {
  render () {
    console.log(`render Models.Model`)
    const { index: index1, properties, addModelProperty } = this.props
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
              <Button type='primary' size='large' onClick={addModelProperty}><Icon type='plus' />Add property</Button>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Model
