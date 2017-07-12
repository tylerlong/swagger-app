import React from 'react'
import R from 'ramda'
import { Button, Collapse, Icon } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPermission } from '../../actions'

class Permissions extends React.Component {
  render () {
    console.log(`render Permissions`)
    const { permissions, addPermission } = this.props
    return (
      <div>
        <h2>Permissions</h2>
        <Collapse accordion>
          {R.sort(R.comparator((a, b) => R.toLower(a.name) < R.toLower(b.name)), permissions).map(permission => {
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
