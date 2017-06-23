import React from 'react'
import R from 'ramda'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { addModel } from '../actions'

class Models extends React.Component {
  render () {
    return (
      <div>
        <h2>Models</h2>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={this.props.addModel}>Add model</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addModel })(Models)
