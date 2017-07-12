// @flow

import R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import { setProp } from '../actions'

class Alerts extends React.Component<void, { alerts: { type: string, message: string }[], setProp: Function }, void> {
  timer: number
  componentDidMount () {
    const { setProp } = this.props
    this.timer = setInterval(() => {
      if (this.props.alerts.length === 0) { // never cache `alerts`
        return
      }
      R.forEach(alert => R.prop(alert.type, message)(alert.message), this.props.alerts)
      setProp(['alerts'], [])
    }, 100)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render () {
    console.log(`render Alerts`)
    return null
  }
}

export default connect(R.pick(['alerts']), { setProp })(Alerts)
