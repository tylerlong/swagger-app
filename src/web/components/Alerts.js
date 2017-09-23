import R from 'ramda'
import React from 'react'
import { message } from 'antd'

class Alerts extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.alerts.length > 0
  }
  componentDidUpdate () {
    const { alerts, clearAlerts } = this.props
    R.forEach(alert => R.prop(alert.type, message)(alert.message), alerts)
    clearAlerts()
  }
  render () {
    console.log(`render Alerts`)
    return null
  }
}

export default Alerts
