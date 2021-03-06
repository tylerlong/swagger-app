import React from 'react'
import { Tabs, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { Base64 } from 'js-base64'
import PropTypes from 'prop-types'

import Info from '../components/Info'
import Permissions from '../containers/Permissions'
import PathParameters from '../containers/PathParameters'
import Paths from '../containers/Paths'
import Models from '../containers/Models'

class App extends React.Component {
  componentDidMount () {
    const { loadState, match: { params: { base64 } } } = this.props
    const filePath = Base64.decode(base64)
    loadState(filePath)
    window.document.title = filePath
  }
  render () {
    console.log('render App')
    const { title, version, exportReduxState } = this.props
    return (
      <div>
        <Button><Link to='/'><Icon type='home' /> Home</Link></Button>
        <h1>{title} {version}</h1>
        <Tabs tabPosition='left' defaultActiveKey='basic-info'>
          <Tabs.TabPane tab='Basic Info' key='basic-info'><Info /></Tabs.TabPane>
          <Tabs.TabPane tab='Permissions' key='permissions'><Permissions /></Tabs.TabPane>
          <Tabs.TabPane tab='Path Parameters' key='path-parameters'><PathParameters /></Tabs.TabPane>
          <Tabs.TabPane tab='Paths' key='paths'><Paths /></Tabs.TabPane>
          <Tabs.TabPane tab='Models' key='models'><Models /></Tabs.TabPane>
          <Tabs.TabPane tab={<span><Icon type='tool' />Troubleshooting</span>} key='troubleshooting'>
            <h2>Troubleshooting</h2>
            <Button type='primary' onClick={exportReduxState}>Export Redux state</Button>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  loadState: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      base64: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default App
