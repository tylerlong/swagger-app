import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePathParameter } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    console.log(`render PathParameters.FormItem`)
    const { pathParameter, setProp, deletePathParameter } = this.props
    if (!pathParameter) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete path parameter "${pathParameter.name}"?`} okText='Yes' cancelText='No' onConfirm={deletePathParameter}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={pathParameter.name} onChange={(event) => { setProp('name', event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={pathParameter.description} onChange={(event) => { setProp('description', event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Enum'>
          <Input placeholder='Enum values separated by commas' size='large' defaultValue={R.join(', ', pathParameter.enum)} onChange={(event) => { setProp('enum', R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
        </Form.Item>
      </div>
    )
  }
}

const mapStateToProps = ({ pathParameters }, { index }) => ({ pathParameter: pathParameters[index] })
const mapDispathToProps = (dispatch, { index }) => ({
  deletePathParameter: () => dispatch(deletePathParameter(index)),
  setProp: (key, value) => dispatch(setProp(['pathParameters', index, key], value))
})
export default connect(mapStateToProps, mapDispathToProps)(FormItem)
