import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

class CenterPanel extends React.Component {
  render () {
    return (
      <Row type='flex' justify='center'>
        <Col xs={24} sm={22}>
          {this.props.children}
        </Col>
      </Row>
    )
  }
}

CenterPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ]).isRequired
}

export default CenterPanel
