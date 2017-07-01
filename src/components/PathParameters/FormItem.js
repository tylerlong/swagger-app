import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm } from 'antd'

import { setProp, deletePathParameter } from '../../actions'
import { formItemLayout } from '../../utils/components'

class FormItem extends React.Component {
  render () {
    const { index, pathParameters, setProp, deletePathParameter } = this.props
    const pathParameter = pathParameters[index]
    return (
      <div>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={pathParameter.name} onChange={(event) => { setProp(['pathParameters', index, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={pathParameter.description} onChange={(event) => { setProp(['pathParameters', index, 'description'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Enum'>
          <Input placeholder='Enum values separated by commas' size='large' defaultValue={R.join(', ', pathParameter.enum)} onChange={(event) => { setProp(['pathParameters', index, 'enum'], R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
        </Form.Item>
        <div className='button-line'>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={() => deletePathParameter(index)}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePathParameter })(FormItem)
