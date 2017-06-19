import React from 'react'
import { Input, Form } from 'antd'
import R from 'ramda'

import { connect } from 'react-redux'

import { loadState, setProp } from '../actions'

class App extends React.Component {
  componentDidMount () {
    this.props.loadState()
  }
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    return (
      <div>
        <h1>{this.props.name} {this.props.version}</h1>
        <Form>
          <Form.Item {...formItemLayout} label='Name'>
            <Input placeholder='Name' size='large' value={this.props.name} onChange={(event) => { this.props.setProp('name', event.target.value) }} />
          </Form.Item>
          <Form.Item {...formItemLayout} label='Version'>
            <Input placeholder='Version' size='large' value={this.props.version} onChange={(event) => { this.props.setProp('version', event.target.value) }} />
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, loadState })(App)
