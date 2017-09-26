import React from 'react'
import R from 'ramda'
import { Input } from 'antd'
import PropTypes from 'prop-types'

import FormItem from './FormItem'

class TextField extends React.Component {
  render () {
    console.log('render TextField')
    const { name, value, update, isArray } = this.props
    let input = null
    if (isArray) {
      input = <Input placeholder='Values separated by commas' defaultValue={R.join(', ', value || [])}
        onChange={event => { update(R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
    } else {
      input = <Input placeholder={name} value={value}
        onChange={event => { update(event.target.value) }} />
    }
    return (
      <FormItem label={name}>
        {input}
      </FormItem>
    )
  }
}

TextField.defaultProps = {
  isArray: false
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  update: PropTypes.func.isRequired,
  isArray: PropTypes.bool.isRequired
}

export default TextField
