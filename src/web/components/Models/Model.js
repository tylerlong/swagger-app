import R from 'ramda'
import React from 'react'
import { Input, Form, Button, Popconfirm, Collapse, Card, Row, Col, Icon } from 'antd'

import { formItemLayout, orderBy } from '../../utils'
import Property from '../../containers/Models/Property'

class Model extends React.Component {
  render () {
    console.log(`render Models.Model`)
    const { index, model, setProp, deleteModel, addModelProperty } = this.props
    if (!model) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete model "${model.name}"?`} okText='Yes' cancelText='No' onConfirm={deleteModel}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={model.name} onChange={(event) => { setProp('name', event.target.value) }} />
        </Form.Item >
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Properties'>
              <Collapse accordion>
                {orderBy(R.prop('createdAt'), model.properties).map(prop => {
                  return (
                    <Collapse.Panel header={prop.name} key={prop.createdAt}>
                      <Property index1={index} index2={R.findIndex(R.propEq('createdAt', prop.createdAt), model.properties)} />
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
