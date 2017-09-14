import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

import Alerts from './Alerts'
import { openFile } from '../actions'

class Home extends React.Component {
  render () {
    console.log('render Home')
    return <div>
      <Alerts />
      <h1>swagger-app</h1>
      <Button type='primary' onClick={this.props.openFile}>Open a swagger file</Button>
    </div>
  }
}

export default connect(null, { openFile })(Home)
