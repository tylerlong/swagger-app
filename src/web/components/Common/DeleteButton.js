import React from 'react'
import { Popconfirm, Button, Icon } from 'antd'
import PropTypes from 'prop-types'

class DeleteButton extends React.Component {
  render () {
    console.log('render DeleteButton')
    const { name, deleteRecord } = this.props
    return (
      <Popconfirm title={`Are you sure to delete "${name}"?`} okText='Yes' cancelText='No' onConfirm={deleteRecord}>
        <Button type='danger'><Icon type='delete' />Delete</Button>
      </Popconfirm>
    )
  }
}

DeleteButton.propTypes = {
  name: PropTypes.string,
  deleteRecord: PropTypes.func.isRequired
}

export default DeleteButton
