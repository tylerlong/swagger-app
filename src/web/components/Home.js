import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { loadState } from '../actions'

class Home extends React.Component {
  render () {
    console.log('render Home')
    return <div>
      <h1>swagger-app</h1>
      <Button type='primary' onClick={this.props.loadState}>Open a swagger file</Button>
    </div>
  }
}

export default connect(null, { loadState })(Home)
