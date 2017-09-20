import React from 'react'
import { Button, Popconfirm, Collapse, Card, Row, Col, Icon } from 'antd'

import Property from '../../containers/Models/Property'
import { ModelTextField } from '../../containers/Models/ModelFields'

class Model extends React.Component {
  render () {
    console.log(`render Models.Model`)
    const { index: index1, model, deleteModel, addModelProperty } = this.props
    if (!model) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete model "${model.name}"?`} okText='Yes' cancelText='No' onConfirm={deleteModel}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <ModelTextField index={index1} name='name' />
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Properties'>
              <Collapse accordion>
                {model.properties.map(({ index: index2, name, createdAt }) => {
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
