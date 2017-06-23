import React from 'react'
import R from 'ramda'
import { Form, Tabs, Button } from 'antd'
import { connect } from 'react-redux'

import { loadState, setProp, addPermission, addPathParameter, addPath, addModel } from '../actions'
import InfoFormItem from './InfoFormItem'
import PermissionFormItem from './PermissionFormItem'
import PathParameterFormItem from './PathParameterFormItem'

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
          <Tabs.TabPane tab='Permissions' key='permissions'>
            <h2>Permissions</h2>
            <div className='primary-button'>
              <Button type='primary' size='large' onClick={this.props.addPermission}>Add permission</Button>
            </div>
            <Form>
              {this.props.permissions.map((permission, index) => <PermissionFormItem index={index} key={`${index}-${permission.name}`} />)}
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Path Parameters' key='path-parameters'>
            <h2>Path Parameters</h2>
            <div className='primary-button'>
              <Button type='primary' size='large' onClick={this.props.addPathParameter}>Add path parameter</Button>
            </div>
            <Form>
              {this.props.pathParameters.map((pathParameter, index) => <PathParameterFormItem index={index} key={`${index}-${pathParameter.name}`} />)}
            </Form>
          </Tabs.TabPane>
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

export default connect(R.identity, { loadState, setProp, addPermission, addPathParameter, addPath, addModel })(App)
