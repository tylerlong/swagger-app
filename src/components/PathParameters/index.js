import React from 'react'
import R from 'ramda'
import { Button, Collapse } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPathParameter, setProp } from '../../actions'

class PathParameters extends React.Component {
  render () {
    const { pathParameters, addPathParameter } = this.props
    return (
      <div>
        <h2>Path Parameters</h2>
        <Collapse accordion>
          {R.sort(R.comparator((a, b) => R.toLower(a.name) < R.toLower(b.name)), pathParameters).map(pathParameter => {
            return (
              <Collapse.Panel header={pathParameter.name} key={pathParameter.createdAt}>
                <FormItem index={R.findIndex(R.propEq('createdAt', pathParameter.createdAt), pathParameters)} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={addPathParameter}>Add path parameter</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addPathParameter, setProp })(PathParameters)
