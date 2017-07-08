import React from 'react'
import R from 'ramda'
import { Tabs, message } from 'antd'
import { connect } from 'react-redux'

import { loadState, setProp } from '../actions'
import Info from './Info'
import Permissions from './Permissions'
import PathParameters from './PathParameters'
import Paths from './Paths'
import Models from './Models'

class App extends React.Component {
  componentDidMount () {
    this.props.loadState()
    this.timer = setInterval(() => {
      R.forEach(alert => R.prop(alert.type, message)(alert.message), this.props.metadata.alerts)
      this.props.setProp(['metadata', 'alerts'], [])
    }, 100)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render () {
    const { info } = this.props
    return (
      <div>
        <h1>{info.title} {info.version}</h1>
        <Tabs tabPosition='left' defaultActiveKey='path-parameters'>
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

export default connect(R.identity, { loadState, setProp })(App)
