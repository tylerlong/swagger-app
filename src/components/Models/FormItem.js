import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deleteModel, moveModelUp, moveModelDown } from '../../actions'
import { formItemLayout } from '../../utils/components'

class FormItem extends React.Component {
  render () {
    const { models, index, setProp, moveModelUp, moveModelDown, deleteModel } = this.props
    const model = models[index]
    return (
      <div>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={model.name} onChange={(event) => { setProp(['models', index, 'name'], event.target.value) }} />
        </Form.Item>
        <div className='button-line'>
          <Button disabled={index === 0} onClick={moveModelUp}>Move up <Icon type='arrow-up' /></Button>
          <Button disabled={index === models.length - 1} onClick={moveModelDown}>Move down <Icon type='arrow-down' /></Button>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={deleteModel}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deleteModel, moveModelUp, moveModelDown })(FormItem)
