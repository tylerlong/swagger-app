import React from 'react'

import { InfoTextField } from '../../containers/Info'

class Info extends React.Component {
  render () {
    console.log('render Info')
    return (
      <div>
        <h2>Basic Info</h2>
        <InfoTextField name='title' />
        <InfoTextField name='version' />
        <InfoTextField name='description' />
        <InfoTextField name='termsOfService' />
        <InfoTextField name='host' />
        <InfoTextField name='basePath' />
        <InfoTextField name='schemes' isArray />
        <InfoTextField name='produces' isArray />
        <InfoTextField name='consumes' isArray />
        <InfoTextField name='tags' isArray />
      </div>
    )
  }
}

export default Info
