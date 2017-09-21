import React from 'react'
import { Button, Icon } from 'antd'

class AddButton extends React.Component {
  render () {
    console.log(`render AddButton`)
    const { name, add } = this.props
    return <Button type='primary' size='large' onClick={add}><Icon type='plus' />Add {name}</Button>
  }
}

export default AddButton
