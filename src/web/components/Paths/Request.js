import React from 'react'
import { connect } from 'react-redux'
import { Input, Form, Popconfirm, Button, Icon, Select } from 'antd'

import { setProp, deleteFromArray } from '../../actions'
import { subFormItemLayout } from '../../utils'

class Request extends React.Component {
  render () {
    console.log(`render Paths.Request`)
    const { prop, setProp, deletePathRequest } = this.props
    if (!prop) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete request "${prop.name}"?`} okText='Yes' cancelText='No' onConfirm={deletePathRequest}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...subFormItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={prop.name} onChange={(event) => { setProp('name', event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Method'>
          <Select style={{ width: 120 }} value={prop.method} onChange={(value) => { setProp('method', value) }}>
            <Select.Option value='GET'>GET</Select.Option>
            <Select.Option value='POST'>POST</Select.Option>
            <Select.Option value='PUT'>PUT</Select.Option>
            <Select.Option value='DELETE'>DELETE</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={prop.description} onChange={(event) => { setProp('description', event.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

const mapStateToProps = ({ paths }, { index1, index2 }) => ({ prop: paths[index1].requests[index2] })
const mapDispatchToProps = (dispatch, { index1, index2 }) => ({
  setProp: (key, value) => dispatch(setProp(['paths', index1, 'requests', index2, key], value)),
  deletePathRequest: () => dispatch(deleteFromArray('paths', index1, 'requests', index2))
})
export default connect(mapStateToProps, mapDispatchToProps)(Request)
