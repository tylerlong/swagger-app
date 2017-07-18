import React from 'react'

import FormItem from './FormItem'

class Info extends React.Component {
  render () {
    console.log(`render Info`)
    return (
      <div>
        <h2>Info</h2>
        {['title', 'version', 'description', 'termsOfService', 'host', 'basePath', 'schemes', 'produces', 'consumes'].map(name => <FormItem name={name} key={name} />)}
      </div>
    )
  }
}

export default Info
