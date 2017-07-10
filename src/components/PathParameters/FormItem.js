import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePathParameter } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    console.log(`render PathParameters.FormItem`)
    const { index, pathParameters, setProp, deletePathParameter } = this.props
    const pathParameter = pathParameters[index]
    if (!pathParameter) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete path parameter "${pathParameter.name}"?`} okText='Yes' cancelText='No' onConfirm={() => deletePathParameter(index)}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={pathParameter.name} onChange={(event) => { setProp(['pathParameters', index, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={pathParameter.description} onChange={(event) => { setProp(['pathParameters', index, 'description'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Enum'>
          <Input placeholder='Enum values separated by commas' size='large' defaultValue={R.join(', ', pathParameter.enum)} onChange={(event) => { setProp(['pathParameters', index, 'enum'], R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
        </Form.Item>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePathParameter })(FormItem)
