import React from 'react'
import R from 'ramda'
import { Button, Icon, Collapse } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPath } from '../../actions'

class Paths extends React.Component {
  render () {
    const { paths, addPath } = this.props
    return (
      <div>
        <h2>Paths</h2>
        <Collapse accordion>
          {R.sort(R.comparator((a, b) => R.toLower(a.path) < R.toLower(b.path)), paths).map(path => {
            return (
              <Collapse.Panel header={path.path} key={path.createdAt}>
                <FormItem index={R.findIndex(R.propEq('createdAt', path.createdAt), paths)} />
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
