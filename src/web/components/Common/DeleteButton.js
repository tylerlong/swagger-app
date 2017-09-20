import React from 'react'
import { Popconfirm, Button, Icon } from 'antd'

class DeleteButton extends React.Component {
  render () {
    console.log(`render DeleteButton`)
    const { componentName, recordName, deleteRecord } = this.props
    return (
      <Popconfirm title={`Are you sure to delete ${componentName} "${recordName}"?`} okText='Yes' cancelText='No' onConfirm={deleteRecord}>
        <Button type='danger'><Icon type='arrow-up' />Delete</Button>
      </Popconfirm>
    )
  }
}

export default DeleteButton
