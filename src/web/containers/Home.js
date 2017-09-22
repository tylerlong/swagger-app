import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { openFile, newFile } from '../actions'

class Home extends React.Component {
  componentDidMount () {
    window.document.title = 'swagger-app'
  }
  render () {
    console.log('render Home')
    const { openFile, newFile } = this.props
    return <div>
      <h1>swagger-app</h1>
      { global.electron ? <Button onClick={newFile}>New</Button> : null }
      <Button type='primary' onClick={openFile}>Open</Button>
    </div>
  }
}

export default connect(null, { openFile, newFile })(Home)
