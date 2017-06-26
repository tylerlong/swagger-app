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
  setActiveIndex (key) {
    let activeIndex = -1
    if (key) {
      activeIndex = parseInt(R.last(R.split('-', key)))
    }
    this.props.setProp(['metadata', 'activeModelIndex'], activeIndex)
  }
  render () {
    const { models, metadata, addModel } = this.props
    return (
      <div>
        <h2>Models</h2>
        <Collapse accordion activeKey={`${models.length}-${metadata.activeModelIndex}`} onChange={this.setActiveIndex}>
          {models.map((model, index) => {
            return (
              <Collapse.Panel header={model.name} key={`${models.length}-${index}`}>
                <FormItem index={index} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <div className='primary-button'>
          <Button type='primary' size='large' onClick={addModel}>Add model</Button>
        </div>
      </div>
    )
  }
}

export default connect(R.identity, { addModel, setProp })(Models)
