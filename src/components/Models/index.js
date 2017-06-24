import React from 'react'
import R from 'ramda'
import { Button, Collapse } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addModel, setProp } from '../../actions'

class Models extends React.Component {
  constructor (props) {
    super(props)
    this.setActiveIndex = this.setActiveIndex.bind(this)
  }
  activeKey () {
    return `${this.props.models.length}-${this.props.metadata.activeModelIndex}`
  }
  setActiveIndex (key) {
    let activeIndex = -1
    if (key) {
      activeIndex = parseInt(R.last(R.split('-', key)))
    }
    this.props.setProp(['metadata', 'activeModelIndex'], activeIndex)
  }
  render () {
    return (
      <div>
        <h2>Models</h2>
        <Collapse accordion activeKey={this.activeKey()} onChange={this.setActiveIndex}>
          {this.props.models.map((model, index) => {
            return (
              <Collapse.Panel header={model.name} key={`${this.props.models.length}-${index}`}>
                <FormItem index={index} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={this.props.addModel}>Add model</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addModel, setProp })(Models)
