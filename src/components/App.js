import React from 'react'
import R from 'ramda'
import { Form, Tabs, Button } from 'antd'
import { connect } from 'react-redux'

import { loadState } from '../actions'
import InfoFormItem from './InfoFormItem'
import PermissionFormItem from './PermissionFormItem'

class App extends React.Component {
  componentDidMount () {
    this.props.loadState()
  }

  render () {
    return (
      <div>
        <h1>{this.props.title} {this.props.version}</h1>
        <Tabs tabPosition='left'>
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
              <Button type='primary' size='large'>Add permission</Button>
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

export default connect(R.identity, { loadState })(App)
