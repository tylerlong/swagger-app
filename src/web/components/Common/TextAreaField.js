import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

import FormItem from './FormItem'

class TextAreaField extends React.Component {
  render () {
    console.log('render TextAreaField')
    const { name, value, update } = this.props
    return (
      <FormItem label={name}>
        <Input.TextArea placeholder={name} value={value} autosize={{ minRows: 2, maxRows: 16 }}
          onChange={event => { update(event.target.value) }} />
      </FormItem>
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
