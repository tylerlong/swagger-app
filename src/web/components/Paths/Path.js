import React from 'react'
import { Collapse, Card, Row, Col } from 'antd'
import PropTypes from 'prop-types'

import { PathTextField, DeletePathButton, AddPathRequestButton } from '../../containers/Paths/Path'
import Request from './Request'
import { pathType, objType } from '../../utils'

class Path extends React.Component {
  render () {
    console.log(`render Path`)
    const { path, requests } = this.props
    return (
      <div>
        <DeletePathButton path={path} />
        <PathTextField path={path} name='name' />
        <PathTextField path={path} name='uri' />
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Requests'>
              <Collapse accordion>
                {requests.map(({ path, label, createdAt }) => {
                  return (
                    <Collapse.Panel header={label} key={createdAt}>
                      <Request path={path} />
                    </Collapse.Panel>
                  )
                })}
              </Collapse>
              <AddPathRequestButton path={path} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

Path.propTypes = {
  path: pathType,
  requests: PropTypes.arrayOf(objType)
}

export default Path
