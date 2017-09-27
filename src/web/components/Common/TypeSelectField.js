import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

import FormItem from './FormItem'

const options = ['string', 'object', 'integer', 'boolean', 'date-time', 'int64', 'number', 'binary']

class TypeSelectField extends React.Component {
  render () {
    console.log('render TypeSelectField')
    const { name, value, update } = this.props
    return (
      <FormItem label={name}>
        <Select value={value} onChange={value => { update(value) }} style={{ width: 120 }}>
          {options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>)}
        </Select>
      </FormItem>
    )
  }
}

TypeSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}

export default TypeSelectField
