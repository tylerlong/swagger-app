import React from 'react'
import R from 'ramda'
import { Button, Icon, Collapse } from 'antd'
import { connect } from 'react-redux'

import Path from './Path'
import { addPath } from '../../actions'
import { orderBy } from '../../utils'

class Paths extends React.Component {
  render () {
    console.log(`render Paths`)
    const { paths, addPath } = this.props
    return (
      <div>
        <h2>Paths</h2>
        <Collapse accordion>
          {orderBy(R.prop('path'), paths).map(path => {
            return (
              <Collapse.Panel header={path.path} key={path.createdAt}>
                <Path index={R.findIndex(R.propEq('createdAt', path.createdAt), paths)} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <Button type='primary' size='large' onClick={addPath}><Icon type='plus' />Add path</Button>
      </div>
    )
  }
}

export default connect(R.pick(['paths']), { addPath })(Paths)
