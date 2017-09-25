import R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'

class SmartCollapse extends React.Component {
  constructor (props) {
    super(props)
    this.state = { activeKey: undefined }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.children.length > prevProps.children.length) { // a new item added
      this.setState({ activeKey: R.last(this.props.children).props.id })
    }
  }
  render () {
    return (
      <Collapse {...this.props} activeKey={this.state.activeKey} onChange={activeKey => this.setState({ activeKey })} />
    )
  }
}

export default SmartCollapse
