import * as R from 'ramda'
import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

import FormItem from './FormItem'
import { primitiveTypes } from '../../utils'

const options = primitiveTypes

class TypeSelectField extends React.Component {
  render () {
    console.log('render TypeSelectField')
    const { value, update, models } = this.props

    let modelSelect = null
    if (value === 'object' || !R.contains(value, options)) {
      modelSelect = (
        <Select value={value === 'object' ? '' : value} onChange={value => { update(value) }} style={{ width: '100%' }}>
          {models.map(({name, createdAt}) => <Select.Option value={name} key={createdAt}>{name}</Select.Option>)}
        </Select>
      )
    }

    return (
      <FormItem label='Type'>
        <Select value={R.contains(value, options) ? value : 'object'} onChange={value => { update(value) }} style={{ width: 128, paddingRight: 8 }}>
          {options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>)}
        </Select>
        {modelSelect}
      </FormItem>
    )
  }
}

TypeSelectField.propTypes = {
  value: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default TypeSelectField
