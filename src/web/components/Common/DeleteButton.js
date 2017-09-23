import React from 'react'
import { Popconfirm, Button, Icon } from 'antd'
import PropTypes from 'prop-types'

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

DeleteButton.propTypes = {
  componentName: PropTypes.string.isRequired,
  recordName: PropTypes.string,
  deleteRecord: PropTypes.func.isRequired
}

export default DeleteButton
