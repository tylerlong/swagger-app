import React from 'react'
import { Form, Select } from 'antd'
import PropTypes from 'prop-types'

import { formItemLayout } from '../../utils'

class SelectField extends React.Component {
  render () {
    console.log(`render SelectField`)
    const { name, value, update, options } = this.props
    return (
      <Form.Item {...formItemLayout} label={name}>
        <Select style={{ width: 120 }} value={value} onChange={value => { update(value) }}>
          { options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>) }
        </Select>
      </Form.Item>
    )
  }
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default SelectField
