import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import { Popconfirm, Button, Icon, Form, Input } from 'antd'

import { setProp, deletePath } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    const { index, paths, setProp, deletePath } = this.props
    const path = paths[index]
    if (!path) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete path "${path.path}"?`} okText='Yes' cancelText='No' onConfirm={() => deletePath(index)}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Name'>
          <Input placeholder='Path' size='large' value={path.path} onChange={(event) => { setProp(['paths', index, 'path'], event.target.value) }} />
        </Form.Item>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, deletePath })(FormItem)
