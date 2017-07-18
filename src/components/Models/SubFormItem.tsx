import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form, Popconfirm, Button, Icon, Checkbox, Select } from 'antd'

import { setProp, deleteModelProperty } from '../../actions'
import { subFormItemLayout } from '../../utils'

class SubFormItem extends React.Component<any> {
  render() {
    console.log(`render Models.SubFormItem`)
    const { prop, setProp, deleteModelProperty } = this.props
    if (!prop) {
      return null
    }
    return (
      <div>
        <Popconfirm title={`Are you sure to delete property "${prop.name}"?`} okText='Yes' cancelText='No' onConfirm={deleteModelProperty}>
          <Button type='danger'><Icon type='arrow-up' />Delete</Button>
        </Popconfirm>
        <Form.Item {...subFormItemLayout} label='Name'>
          <Input placeholder='Name' size='large' value={prop.name} onChange={(event: any) => { setProp('name', event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Description'>
          <Input placeholder='Description' size='large' value={prop.description} onChange={(event: any) => { setProp('description', event.target.value) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Type'>
          <Select style={{ width: 120 }} value={prop.type} onChange={(value) => { setProp('type', value) }}>
            <Select.Option value='string'>string</Select.Option>
            <Select.Option value='object'>object</Select.Option>
            <Select.Option value='integer'>integer</Select.Option>
            <Select.Option value='boolean'>boolean</Select.Option>
            <Select.Option value='date-time'>date-time</Select.Option>
            <Select.Option value='int64'>int64</Select.Option>
            <Select.Option value='number'>number</Select.Option>
            <Select.Option value='binary'>binary</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Enum'>
          <Input placeholder='Values separated by commas' size='large' defaultValue={R.join(', ', prop.enum)} onChange={(event: any) => { setProp('enum', R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
        </Form.Item>
        <Form.Item {...subFormItemLayout} label='Options'>
          <Checkbox checked={prop.required} onChange={(event: any) => { setProp('required', event.target.checked) }}>Required</Checkbox>
          <Checkbox checked={prop.isArray} onChange={(event: any) => { setProp('isArray', event.target.checked) }}>Is array</Checkbox>
        </Form.Item>
      </div>
    )
  }
}

const mapStateToProps = ({ models }, { index1, index2 }) => ({ prop: models[index1].properties[index2] })
const mapDispatchToProps = (dispatch, { index1, index2 }) => ({
  setProp: (key, value) => dispatch(setProp(['models', index1, 'properties', index2, key], value)),
  deleteModelProperty: () => dispatch(deleteModelProperty(index1, index2))
})
export default connect(mapStateToProps, mapDispatchToProps)(SubFormItem)
