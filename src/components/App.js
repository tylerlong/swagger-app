import React from 'react'
import R from 'ramda'
import { Form, Tabs } from 'antd'
import { connect } from 'react-redux'

import { loadState } from '../actions'
import BasicFormItem from './BasicFormItem'

class App extends React.Component {
  componentDidMount () {
    this.props.loadState()
  }

  render () {
    return (
      <div>
        <h1>{this.props.title} {this.props.version}</h1>
        <Tabs tabPosition='left'>
          <Tabs.TabPane tab='Basic Info' key='basic-info'>
            <Form>
              <BasicFormItem path='title' />
              <BasicFormItem path='version' />
              <BasicFormItem path='description' />
              <BasicFormItem path='termsOfService' />
              <BasicFormItem path='host' />
              <BasicFormItem path='basePath' />
              <BasicFormItem path='schemes' />
              <BasicFormItem path='produces' />
              <BasicFormItem path='consumes' />
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Permissions' key='permissions'>
            Hello world
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(R.identity, { loadState })(App)
