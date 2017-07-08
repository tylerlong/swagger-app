import React from 'react'
import R from 'ramda'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'

import { addPath } from '../../actions'

class Paths extends React.Component {
  render () {
    const { addPath } = this.props
    return (
      <div>
        <h2>Paths</h2>
        <Button type='primary' size='large' onClick={addPath}><Icon type='plus' />Add path</Button>
      </div>
    )
  }
}

export default connect(R.identity, { addPath })(Paths)
