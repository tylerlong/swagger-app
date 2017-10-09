// import R from 'ramda'
import React from 'react'
// import { message } from 'antd'
import PropTypes from 'prop-types'

class Alerts extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.alerts.length > 0
  }
  componentDidUpdate () {
    // todo: antd doesn't work with React 16. uncomment the following lines when it works
    // const { alerts, clearAlerts } = this.props
    // R.forEach(alert => R.prop(alert.type, message)(alert.message), alerts)
    // clearAlerts()
  }
  render () {
    console.log('render Alerts')
    return null
  }
}

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
      message: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  clearAlerts: PropTypes.func.isRequired
}

export default Alerts
