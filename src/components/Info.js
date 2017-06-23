import React from 'react'
import R from 'ramda'
import { Form } from 'antd'
import { connect } from 'react-redux'

import InfoFormItem from './InfoFormItem'

class Info extends React.Component {
  render () {
    return (
      <div>
        <h2>Info</h2>
        <Form>
          {['title', 'version', 'description', 'termsOfService', 'host', 'basePath', 'schemes', 'produces', 'consumes'].map(path => <InfoFormItem path={path} key={path} />)}
        </Form>
      </div>
    )
  }
}

export default connect(R.identity)(Info)
