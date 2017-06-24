import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import FormItem from './FormItem'

class Info extends React.Component {
  render () {
    return (
      <div>
        <h2>Info</h2>
        {['title', 'version', 'description', 'termsOfService', 'host', 'basePath', 'schemes', 'produces', 'consumes'].map(path => <FormItem path={path} key={path} />)}
      </div>
    )
  }
}

export default connect(R.identity)(Info)
