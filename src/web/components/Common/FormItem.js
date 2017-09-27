import React from 'react'
import { Form } from 'antd'
import PropTypes from 'prop-types'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

class FormItem extends React.Component {
  render () {
    const { label, children } = this.props
    return (
      <Form.Item {...formItemLayout} label={label}>
        {children}
      </Form.Item>
    )
  }
}

FormItem.propTypes = {
  label: PropTypes.string.isRequired
}

export default FormItem
