import React from 'react'
import { connect } from 'react-redux'
import { Input, Form, Popconfirm, Button, Icon, Select } from 'antd'

import { setProp, deleteFromArray } from '../../actions'
import { formItemLayout } from '../../utils'

class Request extends React.Component {
  render () {
    console.log(`render Paths.Request`)
    const { request, setProp, deletePathRequest } = this.props
    if (!request) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete request "${request.name}"?`} okText='Yes' cancelText='No' onConfirm={deletePathRequest}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={request.name} onChange={(event) => { setProp('name', event.target.value) }} />
        </Form.Item>
        <Form.Item {...formItemLayout} label='Method'>
          <Select style={{ width: 120 }} value={request.method} onChange={(value) => { setProp('method', value) }}>
            <Select.Option value='GET'>GET</Select.Option>
            <Select.Option value='POST'>POST</Select.Option>
            <Select.Option value='PUT'>PUT</Select.Option>
            <Select.Option value='DELETE'>DELETE</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...formItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={request.description} onChange={(event) => { setProp('description', event.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

const mapStateToProps = ({ paths }, { index1, index2 }) => ({ request: paths[index1].requests[index2] })
const mapDispatchToProps = (dispatch, { index1, index2 }) => ({
  setProp: (key, value) => dispatch(setProp(['paths', index1, 'requests', index2, key], value)),
  deletePathRequest: () => dispatch(deleteFromArray('paths', index1, 'requests', index2))
})
export default connect(mapStateToProps, mapDispatchToProps)(Request)
