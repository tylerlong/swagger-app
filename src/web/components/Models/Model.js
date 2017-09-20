import React from 'react'
import { Input, Form, Button, Popconfirm, Collapse, Card, Row, Col, Icon } from 'antd'

import { formItemLayout } from '../../utils'
import Property from '../../containers/Models/Property'

class Model extends React.Component {
  render () {
    console.log(`render Models.Model`)
    const { index: index1, model, update, deleteModel, addModelProperty } = this.props
    if (!model) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete model "${model.name}"?`} okText='Yes' cancelText='No' onConfirm={deleteModel}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={model.name} onChange={(event) => { update('name', event.target.value) }} />
        </Form.Item >
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
      </div >
    )
  }
}

export default Model
