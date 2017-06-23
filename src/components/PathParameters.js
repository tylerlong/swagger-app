import React from 'react'
import R from 'ramda'
import { Form, Button } from 'antd'
import { connect } from 'react-redux'

import PathParameterFormItem from './PathParameterFormItem'
import { addPathParameter } from '../actions'

class PathParameters extends React.Component {
  render () {
    return (
      <div>
        <h2>Path Parameters</h2>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={this.props.addPathParameter}>Add path parameter</Button>
        </div>
        <Form>
          {this.props.pathParameters.map((pathParameter, index) => <PathParameterFormItem index={index} key={`${this.props.pathParameters.length}-${index}`} />)}
        </Form>
      </div>
    )
  }
}

export default connect(R.identity, { addPathParameter })(PathParameters)
