import React from 'react'
import { Input, Form } from 'antd'
import PropTypes from 'prop-types'

import { formItemLayout } from '../../utils'

class TextAreaField extends React.Component {
  render () {
    console.log('render TextAreaField')
    const { name, value, update } = this.props
    return (
      <Form.Item {...formItemLayout} label={name}>
        <Input.TextArea placeholder={name} value={value} autosize={{ minRows: 2, maxRows: 16 }}
          onChange={event => { update(event.target.value) }} />
      </Form.Item>
    )
  }
}

TextAreaField.defaultProps = {
  value: ''
}

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}

export default TextAreaField