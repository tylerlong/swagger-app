import React from 'react'
import { Collapse, Card, Row, Col } from 'antd'

import { PathTextField, DeletePathButton, AddPathRequestButton } from '../../containers/Paths/Path'
import Request from './Request'

class Path extends React.Component {
  render () {
    console.log(`render Path`)
    const { path, requests } = this.props
    return (
      <div>
        <DeletePathButton path={path} />
        <PathTextField path={path} name='path' />
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Requests'>
              <Collapse accordion>
                {requests.map(({ path, name, createdAt }) => {
                  return (
                    <Collapse.Panel header={name} key={createdAt}>
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

export default Path
