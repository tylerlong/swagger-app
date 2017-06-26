import React from 'react'
import R from 'ramda'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { addPath } from '../../actions'

class Paths extends React.Component {
  render () {
    const { addPath } = this.props
    return (
      <div>
        <h2>Paths</h2>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={addPath}>Add path</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addPath })(Paths)
