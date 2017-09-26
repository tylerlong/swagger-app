import React from 'react'
import { Row, Col } from 'antd'

class CenterPanel extends React.Component {
  render () {
    return <Row type='flex' justify='center'>
      <Col xs={24} sm={22}>
        {this.props.children}
      </Col>
    </Row>
  }
}

export default CenterPanel
