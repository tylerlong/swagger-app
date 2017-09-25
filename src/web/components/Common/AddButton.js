import React from 'react'
import { Button, Icon } from 'antd'
import PropTypes from 'prop-types'

class AddButton extends React.Component {
  render () {
    console.log(`render AddButton`)
    const { name, add } = this.props
    return <Button type='primary' onClick={add}><Icon type='plus' />Add {name}</Button>
  }
}

AddButton.propTypes = {
  name: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired
}

export default AddButton
