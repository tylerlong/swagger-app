import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { message, Input, Form } from 'antd'
import axios from 'axios'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      version: ''
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeVersion = this.handleChangeVersion.bind(this)
  }
  componentDidMount () {
    axios.get('./sample.json').then(res => {
      this.setState(res.data)
      message.success('state loaded')
    })
  }
  handleChangeName (event) {
    this.setState({ name: event.target.value })
  }
  handleChangeVersion (event) {
    this.setState({ version: event.target.value })
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
