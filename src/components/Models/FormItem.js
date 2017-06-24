import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deleteModel, moveModelUp, moveModelDown } from '../../actions'

class FormItem extends React.Component {
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    const model = this.props.models[this.props.index]
    return (
      <div>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={model.name} onChange={(event) => { this.props.setProp(['models', this.props.index, 'name'], event.target.value) }} />
        </Form.Item>
        <div className='button-line'>
          <Button disabled={this.props.index === 0} onClick={this.props.moveModelUp}>Move up <Icon type='arrow-up' /></Button>
          <Button disabled={this.props.index === this.props.models.length - 1} onClick={this.props.moveModelDown}>Move down <Icon type='arrow-down' /></Button>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={(event) => {
            this.props.deleteModel(this.props.index)
          }}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deleteModel, moveModelUp, moveModelDown })(FormItem)
