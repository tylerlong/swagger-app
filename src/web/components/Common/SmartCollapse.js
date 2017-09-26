import R from 'ramda'
import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

// Same as antd Collapse but automatically make the newly added item active
class SmartCollapse extends React.Component {
  constructor (props) {
    super(props)
    this.state = { activeKey: this.props.activeKey }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.children.length > prevProps.children.length) { // a new item added
      this.setState({ activeKey: R.last(this.props.children).key }) // make it active
    }
  }
  render () {
    console.log('render SmartCollapse')
    return <Collapse {...this.props} accordion activeKey={this.state.activeKey} onChange={activeKey => this.setState({ activeKey })} />
  }
}

SmartCollapse.propTypes = {
  children: PropTypes.array.isRequired
}

export default SmartCollapse
