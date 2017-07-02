import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm } from 'antd'

import { setProp, deleteModel } from '../../actions'
import { formItemLayout } from '../../utils/components'

class FormItem extends React.Component {
  render () {
    const { index, models, setProp, deleteModel } = this.props
    const model = models[index]
    return (
      <div>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={model.name} onChange={(event) => { setProp(['models', index, 'name'], event.target.value) }} />
        </Form.Item>
        <div className='button-line'>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={() => deleteModel(index)}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deleteModel })(FormItem)
