import React from 'react'
import { Form, Select } from 'antd'
import PropTypes from 'prop-types'

import { formItemLayout } from '../../utils'

class SelectField extends React.Component {
  render () {
    console.log(`render SelectField`)
    const { name, value, update, options, isArray } = this.props
    let input = null
    if (isArray) {
      input = <Select mode='multiple' style={{ width: 240 }} value={value} onChange={value => { update(value) }}>
        { options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>) }
      </Select>
    } else {
      input = <Select style={{ width: 120 }} value={value} onChange={value => { update(value) }}>
        { options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>) }
      </Select>
    }
    return (
      <Form.Item {...formItemLayout} label={name}>
        {input}
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
