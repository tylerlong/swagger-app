import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'

import { loadState } from '../actions'
import Alerts from './Alerts'
import Info from './Info'
import Permissions from './Permissions'
import PathParameters from './PathParameters'
import Paths from './Paths'
import Models from './Models'

class App extends React.Component {
  componentDidMount () {
    this.props.loadState()
  }
  render () {
    console.log(`render App`)
    const { title, version } = this.props
    return (
      <div>
        <Alerts />
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
