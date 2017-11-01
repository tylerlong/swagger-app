import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

class Home extends React.Component {
  componentDidMount () {
    window.document.title = 'swagger-app'
  }
  render () {
    console.log('render Home')
    const { newFile, openFile, json2yaml, yaml2json } = this.props
    let utilities = null
    if (global.electron) {
      utilities = (
        <div className='utilities'>
          <h2>Utilities</h2>
          <Button onClick={json2yaml}>Convert JSON to YAML</Button>
          <Button onClick={yaml2json}>Convert YAML to JSON</Button>
        </div>
      )
    }
    return <div>
      <h1>swagger-app</h1>
      {global.electron ? <Button onClick={newFile}>New</Button> : null}
      <Button type='primary' onClick={openFile}>Open</Button>
      { utilities }
    </div>
  }
}

Home.propTypes = {
  newFile: PropTypes.func.isRequired,
  openFile: PropTypes.func.isRequired
}

export default Home
