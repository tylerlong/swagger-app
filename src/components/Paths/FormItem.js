import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { setProp, deletePath } from '../../actions'

class FormItem extends React.Component {
  render () {
    return (
      <div>Hello world</div>
    )
  }
}

export default connect(R.identity, { setProp, deletePath })(FormItem)
