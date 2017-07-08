import React from 'react'
import R from 'ramda'
import { Button, Collapse, Icon } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addModel, setProp } from '../../actions'

class Models extends React.Component {
  render () {
    const { models, addModel } = this.props
    return (
      <div>
        <h2>Models</h2>
        <Collapse accordion>
          {R.sort(R.comparator((a, b) => R.toLower(a.name) < R.toLower(b.name)), models).map(model => {
            return (
              <Collapse.Panel header={model.name} key={model.createdAt}>
                <FormItem index={R.findIndex(R.propEq('createdAt', model.createdAt), models)} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <Button type='primary' size='large' onClick={addModel}><Icon type='plus' />Add model</Button>
      </div>
    )
  }
}

export default connect(R.identity, { addModel, setProp })(Models)
