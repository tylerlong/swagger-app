import * as R from 'ramda'
import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

import FormItem from './FormItem'

class SelectField extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(
      R.equals(this.props.value, nextProps.value) &&
      R.equals(this.props.options, nextProps.options)
    )
  }
  render () {
    console.log('render SelectField')
    const { name, value, update, options, isArray } = this.props
    return (
      <FormItem label={name}>
        <Select mode={isArray ? 'multiple' : 'default'} style={{ width: isArray ? '100%' : 128 }} value={value} onChange={value => { update(value) }}>
          {options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>)}
        </Select>
      </FormItem>
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
  ]),
  update: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isArray: PropTypes.bool.isRequired
}

export default SelectField
