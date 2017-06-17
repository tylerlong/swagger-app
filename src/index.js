import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { message, Input } from 'antd'
import axios from 'axios'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    axios.get('./sample.json').then(res => {
      this.setState(res.data)
      message.success('state loaded')
    })
  }
  handleChange (event) {
    this.setState({name: event.target.value})
  }
  render () {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div style={{margin: '0 auto', width: '50%'}}>
          <Input placeholder='Name' size='large' value={this.state.name} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
