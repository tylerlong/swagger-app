import React from 'react'
import { Form } from 'antd'
import PropTypes from 'prop-types'

import { formItemLayout } from '../../utils'

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
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default FormItem
