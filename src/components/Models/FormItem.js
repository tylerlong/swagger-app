import React from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Collapse, Card, Row, Col, Icon } from 'antd'

import { setProp, deleteModel, addModelProperty } from '../../actions'
import { formItemLayout } from '../../utils'
import SubFormItem from './SubFormItem'

class FormItem extends React.Component {
  render () {
    console.log(`render Models.FormItem`)
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
              <Button type='primary' size='large' onClick={addModelProperty}><Icon type='plus' />Add property</Button>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

const mapStateToProps = ({ models }, { index }) => ({ model: models[index] })
const mapDispathToProps = (dispatch, { index }) => ({
  setProp: (key, value) => dispatch(setProp(['models', index, key], value)),
  deleteModel: () => dispatch(deleteModel(index)),
  addModelProperty: () => dispatch(addModelProperty(index))
})
export default connect(mapStateToProps, mapDispathToProps)(FormItem)
