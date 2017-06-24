import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Button, Popconfirm, Icon } from 'antd'

import { setProp, deletePathParameter, movePathParameterUp, movePathParameterDown } from '../../actions'

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
    const pathParameter = this.props.pathParameters[this.props.index]
    return (
      <div>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={pathParameter.name} onChange={(event) => { this.props.setProp(['pathParameters', this.props.index, 'name'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={pathParameter.description} onChange={(event) => { this.props.setProp(['pathParameters', this.props.index, 'description'], event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Enum'>
          <Input placeholder='Enum values separated by commas' size='large' defaultValue={R.join(', ', pathParameter.enum)} onChange={(event) => { this.props.setProp(['pathParameters', this.props.index, 'enum'], R.reject(R.equals(''), R.map(R.trim, R.split(',', event.target.value)))) }} />
        </Form.Item>
        <div className='button-line'>
          <Button disabled={this.props.index === 0} onClick={this.props.movePathParameterUp}>Move up <Icon type='arrow-up' /></Button>
          <Button disabled={this.props.index === this.props.pathParameters.length - 1} onClick={this.props.movePathParameterDown}>Move down <Icon type='arrow-down' /></Button>
          <Popconfirm title='Are you sure to delete it?' okText='Yes' cancelText='No' onConfirm={(event) => {
            this.props.deletePathParameter()
          }}>
            <Button type='danger'>Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePathParameter, movePathParameterUp, movePathParameterDown })(FormItem)