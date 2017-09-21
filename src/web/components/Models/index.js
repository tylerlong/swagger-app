import React from 'react'
import { Collapse } from 'antd'

import { AddModelButton } from '../../containers/Models'
import Model from '../../containers/Models/Model'

class Models extends React.Component {
  render () {
    console.log(`render Models`)
    const { models } = this.props
    return (
      <div>
        <h2>Models</h2>
        <Collapse accordion>
          {models.map(({path, name, createdAt}) => {
            return (
              <Collapse.Panel header={name} key={createdAt}>
                <Model path={path} />
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
