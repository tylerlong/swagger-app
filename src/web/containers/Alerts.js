import R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import { setProp } from '../actions'

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

const mapStateToProps = ({ alerts }) => ({ alerts })
const mapDispatchToProps = (dispatch) => ({ clearAlerts: () => dispatch(setProp(['alerts'], [])) })
export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
