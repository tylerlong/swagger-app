import React from 'react'
import R from 'ramda'
import { Form, Tabs, Button } from 'antd'
import { connect } from 'react-redux'

import { loadState, setProp, addPath, addModel } from '../actions'
import InfoFormItem from './InfoFormItem'
import Permissions from './Permissions'
import PathParameters from './PathParameters'

class App extends React.Component {
  componentDidMount () {
    this.props.loadState()
  }

  render () {
    return (
      <div>
        <h1>{this.props.info.title} {this.props.info.version}</h1>
        <Tabs tabPosition='left' activeKey={this.props.metadata.activeTabKey} onChange={key => { this.props.setProp(['metadata', 'activeTabKey'], key) }}>
          <Tabs.TabPane tab='Info' key='info'>
            <h2>Info</h2>
            <Form>
              {['title', 'version', 'description', 'termsOfService', 'host', 'basePath', 'schemes', 'produces', 'consumes'].map(path => <InfoFormItem path={path} key={path} />)}
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Permissions' key='permissions'><Permissions /></Tabs.TabPane>
          <Tabs.TabPane tab='Path Parameters' key='path-parameters'><PathParameters /></Tabs.TabPane>
          <Tabs.TabPane tab='Paths' key='paths'>
            <h2>Paths</h2>
            <div className='primary-button'>
              <Button type='primary' size='large' onClick={this.props.addPath}>Add path</Button>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Models' key='models'>
            <h2>Models</h2>
            <div className='primary-button'>
              <Button type='primary' size='large' onClick={this.props.addModel}>Add model</Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(R.identity, { loadState, setProp, addPath, addModel })(App)
