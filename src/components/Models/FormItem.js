import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Collapse, Card, Row, Col } from 'antd'

import { setProp, deleteModel } from '../../actions'
import { formItemLayout } from '../../utils/components'
import SubFormItem from './SubFormItem'

class FormItem extends React.Component {
  render () {
    const { index, models, setProp, deleteModel } = this.props
    const model = models[index]
    return (
      <div>
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
            </Card>
          </Col>
        </Row>
        <div className='button-line'>
          <Popconfirm title={`Are you sure to delete model "${model.name}"?`} okText='Yes' cancelText='No' onConfirm={() => deleteModel(index)}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div >
    )
  }
}

export default connect(R.identity, { setProp, deleteModel })(FormItem)
