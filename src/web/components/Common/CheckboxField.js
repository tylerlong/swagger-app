import React from 'react'
import { Checkbox } from 'antd'
import PropTypes from 'prop-types'

import FormItem from './FormItem'

class CheckboxField extends React.Component {
  render () {
    console.log('render CheckboxField')
    const { name, value, update } = this.props
    return (
      <FormItem label={name}>
        <Checkbox checked={value} onChange={event => { update(event.target.checked) }} />
      </FormItem>
    )
  }
}

CheckboxField.defaultProps = {
  value: false
}

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired
}

export default CheckboxField
