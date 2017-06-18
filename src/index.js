import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { message, Input, Form } from 'antd'
import axios from 'axios'
import R from 'ramda'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      version: ''
    }
    this.handleChange = R.curry(this.handleChange)
    this.handleChangeName = this.handleChange('name').bind(this)
    this.handleChangeVersion = this.handleChange('version').bind(this)
  }
  componentDidMount () {
    axios.get('./sample.json').then(res => {
      this.setState(res.data)
      message.success('state loaded')
    })
  }
  handleChange (key, event) {
    this.setState({ [key]: event.target.value })
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
        <h1>{this.state.name} {this.state.version}</h1>
        <Form>
          <Form.Item {...formItemLayout} label='Name'>
            <Input placeholder='Name' size='large' value={this.state.name} onChange={this.handleChangeName} />
          </Form.Item>
          <Form.Item {...formItemLayout} label='Version'>
            <Input placeholder='Version' size='large' value={this.state.version} onChange={this.handleChangeVersion} />
          </Form.Item>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
