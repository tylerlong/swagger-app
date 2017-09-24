import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

class Home extends React.Component {
  componentDidMount () {
    window.document.title = 'swagger-app'
  }
  render () {
    console.log('render Home')
    const { newFile, openFile } = this.props
    return <div>
      <h1>swagger-app</h1>
      {global.electron ? <Button onClick={newFile}>New</Button> : null}
      <Button type='primary' onClick={openFile}>Open</Button>
    </div>
  }
}

Home.propTypes = {
  newFile: PropTypes.func.isRequired,
  openFile: PropTypes.func.isRequired
}

export default Home
