import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePathParameter, movePathParameterUp, movePathParameterDown } from '../../actions'
import { formItemLayout } from '../../utils/components'

class FormItem extends React.Component {
  render () {
    const { index, pathParameters, setProp, deletePathParameter, movePathParameterUp, movePathParameterDown } = this.props
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
          <Input placeholder='Enum values separated by commas' size='large' defaultValue={R.join(', ', pathParameter.enum)} onChange={(event) => { setProp(['pathParameters', index, 'enum'], R.reject(R.equals(''), R.map(R.trim, R.split(',', event.target.value)))) }} />
        </Form.Item>
        <div className='button-line'>
          <Button disabled={index === 0} onClick={movePathParameterUp}>Move up <Icon type='arrow-up' /></Button>
          <Button disabled={index === pathParameters.length - 1} onClick={movePathParameterDown}>Move down <Icon type='arrow-down' /></Button>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={deletePathParameter}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePathParameter, movePathParameterUp, movePathParameterDown })(FormItem)
