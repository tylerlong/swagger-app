import React from 'react'
import { Form } from 'antd'
import R from 'ramda'

import { connect } from 'react-redux'

import { loadState, setProp } from '../actions'

import FormItem from './FormItem'

class App extends React.Component {
  componentDidMount () {
    this.props.loadState()
  }
  render () {
    return (
      <div>
        <h1>{this.props.title} {this.props.version}</h1>
        <Form>
          <FormItem path='title' />
          <FormItem path='version' />
          <FormItem path='description' />
          <FormItem path='termsOfService' />
          <FormItem path='host' />
          <FormItem path='basePath' />
          <FormItem path='schemes' />
          <FormItem path='produces' />
          <FormItem path='consumes' />
        </Form>
      </div>
    )
  }
}

export default connect(R.identity, { setProp, loadState })(App)
