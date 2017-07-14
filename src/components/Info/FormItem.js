import React from 'react'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component {
  render () {
    console.log(`render Info.FormItem`)
    const { name, value, setProp } = this.props
    return (
      <Form.Item {...formItemLayout} label={name}>
        <Input placeholder={name} size='large' value={value} onChange={(event) => { setProp(name, event.target.value) }} />
      </Form.Item>
    )
  }
}

const mapStateToProps = ({ info }, { name }) => ({ value: info[name] })
const mapDispatchToProps = (dispatch) => ({
  setProp: (key, value) => dispatch(setProp(['info', key], value))
})
export default connect(mapStateToProps, mapDispatchToProps)(FormItem)
