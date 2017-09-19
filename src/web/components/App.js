import React from 'react'
import { Tabs, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Base64 } from 'js-base64'

import Info from './Info'
import Permissions from './Permissions'
import PathParameters from './PathParameters'
import Paths from './Paths'
import Models from './Models'
import { loadState } from '../actions'

class App extends React.Component {
  componentDidMount () {
    const { match: { params: { base64 } } } = this.props
    const filePath = Base64.decode(base64)
    this.props.loadState(filePath)
    window.document.title = filePath
  }
  render () {
    console.log(`render App`)
    const { title, version } = this.props
    return (
      <div>
        <Button><Link to='/'><Icon type='home' /> Home</Link></Button>
        <h1>{title} {version}</h1>
        <Tabs tabPosition='left' defaultActiveKey='paths'>
          <Tabs.TabPane tab='Info' key='info'><Info /></Tabs.TabPane>
          <Tabs.TabPane tab='Permissions' key='permissions'><Permissions /></Tabs.TabPane>
          <Tabs.TabPane tab='Path Parameters' key='path-parameters'><PathParameters /></Tabs.TabPane>
          <Tabs.TabPane tab='Paths' key='paths'><Paths /></Tabs.TabPane>
          <Tabs.TabPane tab='Models' key='models'><Models /></Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = ({ info: { title, version } }) => ({ title, version })
export default connect(mapStateToProps, { loadState })(App)
