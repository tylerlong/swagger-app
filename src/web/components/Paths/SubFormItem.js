import React from 'react'
import { connect } from 'react-redux'
import { Input, Form, Popconfirm, Button, Icon } from 'antd'

import { setProp, deletePathRequest } from '../../actions'
import { subFormItemLayout } from '../../utils'

class SubFormItem extends React.Component {
  render () {
    console.log(`render Paths.SubFormItem`)
    const { prop, setProp, deletePathRequest } = this.props
    if (!prop) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete request "${prop.name}"?`} okText='Yes' cancelText='No' onConfirm={deletePathRequest}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
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
  deletePathRequest: () => dispatch(deletePathRequest(index1, index2))
})
export default connect(mapStateToProps, mapDispatchToProps)(SubFormItem)
