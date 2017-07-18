import React from 'react'
import R from 'ramda'
import { Button, Collapse, Icon } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPermission } from '../../actions'
import { orderBy } from '../../utils'

class Permissions extends React.Component<any> {
  render() {
    console.log(`render Permissions`)
    const { permissions, addPermission } = this.props
    return (
      <div>
        <h2>Permissions</h2>
        <Collapse accordion>
          {orderBy(R.prop('name'), permissions).map(permission => {
            return (
              <Collapse.Panel header={permission.name} key={`${permission.createdAt}`}>
                <FormItem index={R.findIndex(R.propEq('createdAt', permission.createdAt), permissions)} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <Button type='primary' size='large' onClick={addPermission}><Icon type='plus' />Add permission</Button>
      </div>
    )
  }
}

export default connect(R.pick(['permissions']), { addPermission })(Permissions)
