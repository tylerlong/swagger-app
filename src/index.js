import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { message, Input, Form } from 'antd'
// import axios from 'axios'
import R from 'ramda'

import { Provider, connect } from 'react-redux'

import store from './store'

class App extends React.Component {
  // constructor (props) {
  //   super(props)
  //   // this.state = {
  //   //   name: '',
  //   //   version: ''
  //   // }
  //   // this.handleChange = R.curry(this.handleChange)
  //   // // this.handleChangeName = this.handleChange('name').bind(this)
  //   // this.handleChangeVersion = this.handleChange('version').bind(this)
  // }
  // componentDidMount () {
  //   axios.get('./sample.json').then(res => {
  //     this.setState(res.data)
  //     message.success('state loaded')
  //   })
  // }
  // handleChange (key, event) {
  //   this.setState({ [key]: event.target.value })
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
            <Input placeholder='Name' size='large' value={this.props.name} onChange={(event) => { this.props.dispatch({ type: 'SET_PROP', path: 'name', value: event.target.value }) }} />
          </Form.Item>
          <Form.Item {...formItemLayout} label='Version'>
            <Input placeholder='Version' size='large' value={this.props.version} onChange={(event) => { this.props.dispatch({ type: 'SET_PROP', path: 'version', value: event.target.value }) }} />
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const ConnectedApp = connect(R.identity, null)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
