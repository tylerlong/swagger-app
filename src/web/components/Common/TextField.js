import React from 'react'
import { Input, Select } from 'antd'
import PropTypes from 'prop-types'

import FormItem from './FormItem'

class TextField extends React.Component {
  render () {
    console.log('render TextField')
    const { name, value, update, isArray } = this.props
    let component = null
    if (isArray) {
      component = <Select placeholder='Input some text then press enter' mode='tags' style={{ width: 256 }} value={value} onChange={value => { update(value) }} />
    } else {
      component = <Input placeholder={name} value={value}
        onChange={event => { update(event.target.value) }} />
    }
    return (
      <FormItem label={name}>
        {component}
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
