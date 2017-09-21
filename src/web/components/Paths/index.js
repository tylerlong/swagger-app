import React from 'react'
import { Collapse } from 'antd'

import { AddPathButton } from '../../containers/Paths'
import Path from '../../containers/Paths/Path'

class Paths extends React.Component {
  render () {
    console.log(`render Paths`)
    const { paths } = this.props
    return (
      <div>
        <h2>Paths</h2>
        <Collapse accordion>
          {paths.map(({path, name, createdAt}) => {
            return (
              <Collapse.Panel header={name} key={createdAt}>
                <Path path={path} />
              </Collapse.Panel>
            )
          })}
        </Collapse>
        <AddPathButton />
      </div>
    )
  }
}

export default Paths
