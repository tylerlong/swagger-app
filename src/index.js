import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { message, Input, Form } from 'antd'
// import axios from 'axios'
import R from 'ramda'

import { Provider, connect } from 'react-redux'

import store from './store'

import { setProp } from './actions'

class App extends React.Component {
  // componentDidMount () {
  //   axios.get('./sample.json').then(res => {
  //     this.setState(res.data)
  //     message.success('state loaded')
  //   })
  // }
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

const ConnectedApp = connect(R.identity, { setProp })(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
