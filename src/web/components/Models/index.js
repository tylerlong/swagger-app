import React from 'react'
import { Collapse } from 'antd'

import Model, { AddModelButton } from '../../containers/Models/Model'

class Models extends React.Component {
  render () {
    console.log(`render Models`)
    const { models } = this.props
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
        <AddModelButton />
      </div>
    )
  }
}

export default Models
