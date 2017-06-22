import React from 'react'
import R from 'ramda'
import { Form, Tabs, Button } from 'antd'
import { connect } from 'react-redux'

import { loadState, setProp, addPermission } from '../actions'
import InfoFormItem from './InfoFormItem'
import PermissionFormItem from './PermissionFormItem'

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
            <Form>
              <InfoFormItem path='title' />
              <InfoFormItem path='version' />
              <InfoFormItem path='description' />
              <InfoFormItem path='termsOfService' />
              <InfoFormItem path='host' />
              <InfoFormItem path='basePath' />
              <InfoFormItem path='schemes' />
              <InfoFormItem path='produces' />
              <InfoFormItem path='consumes' />
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Permissions' key='permissions'>
            <div className='primary-button'>
              <Button type='primary' size='large' onClick={this.props.addPermission}>Add permission</Button>
            </div>
            <Form>
              {this.props.permissions.map((permission, index) => <PermissionFormItem index={index} key={index} />)}
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(R.identity, { loadState, setProp, addPermission })(App)
