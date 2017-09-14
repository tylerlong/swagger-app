import React from 'react'
import R from 'ramda'
import { Button, Collapse, Icon } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPathParameter } from '../../actions'
import { orderBy } from '../../utils'

class PathParameters extends React.Component {
  render () {
    console.log(`render PathParameters`)
    const { pathParameters, addPathParameter } = this.props
    return (
      <div>
        <h2>Path Parameters</h2>
        <Collapse accordion>
          {orderBy(R.prop('name'), pathParameters).map(pathParameter => {
            return (
              <Collapse.Panel header={pathParameter.name} key={pathParameter.createdAt}>
                <FormItem index={R.findIndex(R.propEq('createdAt', pathParameter.createdAt), pathParameters)} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <Button type='primary' size='large' onClick={addPathParameter}><Icon type='plus' />Add path parameter</Button>
      </div>
    )
  }
}

export default connect(R.pick(['pathParameters']), { addPathParameter })(PathParameters)
