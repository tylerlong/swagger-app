import React from 'react'
import R from 'ramda'
import { Button, Collapse } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPermission, setProp } from '../../actions'

class Permissions extends React.Component {
  render () {
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
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={addPermission}>Add permission</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addPermission, setProp })(Permissions)
