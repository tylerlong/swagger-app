import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button, Icon, Form, Input } from 'antd'

import { setProp, deletePath } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component<any> {
  render() {
    console.log(`render Paths.FormItem`)
    const { path, setProp, deletePath } = this.props
    if (!path) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete path "${path.path}"?`} okText='Yes' cancelText='No' onConfirm={deletePath}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Path' size='large' value={path.path} onChange={(event: any) => { setProp('path', event.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

const mapStateToProps = ({ paths }, { index }) => ({ path: paths[index] })
const mapDispatchToProps = (dispatch, { index }) => ({
  deletePath: () => dispatch(deletePath(index)),
  setProp: (key, value) => dispatch(setProp(['paths', index, key], value))
})
export default connect(mapStateToProps, mapDispatchToProps)(FormItem)
