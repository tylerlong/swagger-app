import R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import { setProp } from '../actions'

class Alerts extends React.Component<any> {
  timer: NodeJS.Timer;
  componentDidMount() {
    const { clearAlerts } = this.props
    this.timer = setInterval(() => {
      if (this.props.alerts.length === 0) { // never cache `alerts`
        return
      }
      R.forEach(alert => R.prop(alert.type, message)(alert.message), this.props.alerts)
      clearAlerts()
    }, 100)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    console.log(`render Alerts`)
    return null
  }
}

const mapStateToProps = ({ alerts }) => ({ alerts })
const mapDispatchToProps = (dispatch) => ({ clearAlerts: () => dispatch(setProp(['alerts'], [])) })
export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
