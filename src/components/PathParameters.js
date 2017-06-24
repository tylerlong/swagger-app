import React from 'react'
import R from 'ramda'
import { Form, Button, Collapse } from 'antd'
import { connect } from 'react-redux'

import PathParameterFormItem from './PathParameterFormItem'
import { addPathParameter, setProp } from '../actions'

class PathParameters extends React.Component {
  constructor (props) {
    super(props)
    this.setActiveIndex = this.setActiveIndex.bind(this)
  }
  activeKey () {
    return `${this.props.pathParameters.length}-${this.props.metadata.activePathParameterIndex}`
  }
  setActiveIndex (key) {
    let activeIndex = -1
    if (key) {
      activeIndex = parseInt(R.last(R.split('-', key)))
    }
    this.props.setProp(['metadata', 'activePathParameterIndex'], activeIndex)
  }
  render () {
    return (
      <div>
        <h2>Path Parameters</h2>
        <Form>
          <Collapse accordion activeKey={this.activeKey()} onChange={this.setActiveIndex}>
            {this.props.pathParameters.map((pathParameter, index) => {
              return (
                <Collapse.Panel header={pathParameter.name} key={`${this.props.pathParameters.length}-${index}`}>
                  <PathParameterFormItem index={index} />
                </Collapse.Panel>
              )
            })}
          </Collapse>
        </Form>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={this.props.addPathParameter}>Add path parameter</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addPathParameter, setProp })(PathParameters)
