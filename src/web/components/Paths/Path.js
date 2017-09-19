import R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button, Icon, Form, Input, Row, Col, Card, Collapse } from 'antd'

import { setProp, deletePath, addPathRequest } from '../../actions'
import { formItemLayout, orderBy } from '../../utils'
import Request from './Request'

class Path extends React.Component {
  render () {
    console.log(`render Paths.Path`)
    const { index, path, setProp, deletePath, addPathRequest } = this.props
    if (!path) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete path "${path.path}"?`} okText='Yes' cancelText='No' onConfirm={deletePath}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...formItemLayout} label='Path'>
          <Input placeholder='Path' size='large' value={path.path} onChange={(event) => { setProp('path', event.target.value) }} />
        </Form.Item>
        <Row type='flex' justify='center'>
          <Col xs={24} sm={18}>
            <Card title='Requests'>
              <Collapse accordion>
                {orderBy(R.prop('createdAt'), path.requests).map(prop => {
                  return (
                    <Collapse.Panel header={prop.name} key={prop.createdAt}>
                      <Request index1={index} index2={R.findIndex(R.propEq('createdAt', prop.createdAt), path.requests)} />
                    </Collapse.Panel>
                  )
                })}
              </Collapse>
              <Button type='primary' size='large' onClick={addPathRequest}><Icon type='plus' />Add request</Button>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ paths }, { index }) => ({ path: paths[index] })
const mapDispatchToProps = (dispatch, { index }) => ({
  setProp: (key, value) => dispatch(setProp(['paths', index, key], value)),
  deletePath: () => dispatch(deletePath(index)),
  addPathRequest: () => dispatch(addPathRequest(index))
})
export default connect(mapStateToProps, mapDispatchToProps)(Path)
