import React from 'react'
import { Collapse } from 'antd'
import PropTypes from 'prop-types'

import { AddModelButton } from '../../containers/Models'
import Model from '../../containers/Models/Model'
import { objType } from '../../utils'

class Models extends React.Component {
  render () {
    console.log(`render Models`)
    const { models } = this.props
    return (
      <div>
        <h2>Models</h2>
        <Collapse accordion>
          {models.map(({ path, name, createdAt }) => {
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

Models.propTypes = {
  models: PropTypes.arrayOf(objType)
}

export default Models
