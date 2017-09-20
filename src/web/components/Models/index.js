import React from 'react'
import { Button, Collapse, Icon } from 'antd'

import Model from '../../containers/Models/Model'

class Models extends React.Component {
  render () {
    console.log(`render Models`)
    const { models, addModel } = this.props
    return (
      <div>
        <h2>Models</h2>
        <Collapse accordion>
          {models.map(({index, name, createdAt}) => {
            return (
              <Collapse.Panel header={name} key={createdAt}>
                <Model index={index} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <Button type='primary' size='large' onClick={addModel}><Icon type='plus' />Add model</Button>
      </div>
    )
  }
}

export default Models
