import React from 'react'
import R from 'ramda'
import { Button, Collapse } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addPathParameter, setProp } from '../../actions'

class PathParameters extends React.Component {
  constructor (props) {
    super(props)
    this.setActiveIndex = this.setActiveIndex.bind(this)
  }
  setActiveIndex (key) {
    let activeIndex = -1
    if (key) {
      activeIndex = parseInt(R.last(R.split('-', key)))
    }
    this.props.setProp(['metadata', 'activePathParameterIndex'], activeIndex)
  }
  render () {
    const { pathParameters, metadata, addPathParameter } = this.props
    return (
      <div>
        <h2>Path Parameters</h2>
        <Collapse accordion activeKey={`${pathParameters.length}-${metadata.activePathParameterIndex}`} onChange={this.setActiveIndex}>
          {pathParameters.map((pathParameter, index) => {
            return (
              <Collapse.Panel header={pathParameter.name} key={`${pathParameters.length}-${index}`}>
                <FormItem index={index} />
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
