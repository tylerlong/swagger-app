import React from 'react'
import { Form, Select } from 'antd'
import PropTypes from 'prop-types'

import { formItemLayout } from '../../utils'

class SelectField extends React.Component {
  render () {
    console.log(`render SelectField`)
    const { name, value, update, options, isArray } = this.props
    return (
      <Form.Item {...formItemLayout} label={name}>
        <Select mode={isArray ? 'multiple' : 'default'} style={{ width: isArray ? 240 : 120 }} value={value} onChange={value => { update(value) }}>
          {options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>)}
        </Select>
      </Form.Item>
    )
  }
}

SelectField.defaultProps = {
  isArray: false
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ]).isRequired,
  update: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isArray: PropTypes.bool.isRequired
}

export default SelectField
