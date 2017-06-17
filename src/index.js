import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { message } from 'antd'
import axios from 'axios'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  componentDidMount () {
    axios.get('./sample.json').then(res => {
      this.setState(res.data)
      message.success('state loaded')
    })
  }
  render () {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
