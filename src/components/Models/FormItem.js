import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Collapse, Card, Row, Col, Icon } from 'antd'

import { setProp, deleteModel, addModelProperty } from '../../actions'
import { formItemLayout } from '../../utils'
import SubFormItem from './SubFormItem'

class FormItem extends React.Component {
  render () {
    console.log(`render Models.FormItem`)
    const { index, models, setProp, deleteModel, addModelProperty } = this.props
    const model = models[index]
    if (!model) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete model "${model.name}"?`} okText='Yes' cancelText='No' onConfirm={() => deleteModel(index)}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={model.name} onChange={(event) => { setProp(['models', index, 'name'], event.target.value) }} />
        </Form.Item >
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Properties'>
              <Collapse accordion>
                {model.properties.map((prop, index2) => {
                  return (
                    <Collapse.Panel header={prop.name} key={prop.createdAt}>
                      <SubFormItem index1={index} index2={index2} />
                    </Collapse.Panel>
                  )
                })}
              </Collapse>
              <Button type='primary' size='large' onClick={() => addModelProperty(index)}><Icon type='plus' />Add property</Button>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default connect(R.pick(['models']), { setProp, deleteModel, addModelProperty })(FormItem)
