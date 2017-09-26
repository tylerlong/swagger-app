import React from 'react'
import { Button, Icon } from 'antd'
import PropTypes from 'prop-types'
import a from 'indefinite'

class AddButton extends React.Component {
  render () {
    console.log('render AddButton')
    const { name, add } = this.props
    return <Button type='primary' onClick={add}><Icon type='plus' />Add {a(name)}</Button>
  }
}

AddButton.propTypes = {
  name: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired
}

export default AddButton
