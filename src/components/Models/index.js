import React from 'react'
import R from 'ramda'
import { Button, Collapse, Icon } from 'antd'
import { connect } from 'react-redux'

import FormItem from './FormItem'
import { addModel } from '../../actions'
import { orderBy } from '../../utils'

class Models extends React.Component {
  render () {
    console.log(`render Models`)
    const { models, addModel } = this.props
    return (
      <div>
        <h2>Models</h2>
        <Collapse accordion>
          {orderBy(R.prop('name'), models).map(model => {
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

export default connect(R.pick(['models']), { addModel })(Models)
