import React from 'react'
import PropTypes from 'prop-types'

class Span extends React.Component {
  render () {
    console.log('render Span')
    return <span>{this.props.text}</span>
  }
}

Span.propTypes = {
  text: PropTypes.string.isRequired
}

export default Span
