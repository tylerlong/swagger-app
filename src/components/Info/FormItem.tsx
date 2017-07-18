import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import { setProp } from '../../actions'
import { formItemLayout } from '../../utils'

class FormItem extends React.Component<any> {
  render() {
    console.log(`render Info.FormItem`)
    const { name, value, setProp } = this.props
    let input = <Input placeholder={name} size='large' value={value} onChange={(event: any) => { setProp(name, event.target.value) }} />
    if (R.contains(name, ['schemes', 'produces', 'consumes'])) {
      input = <Input placeholder='Values separated by commas' size='large' defaultValue={R.join(', ', value)} onChange={(event: any) => { setProp(name, R.pipe(R.split(','), R.map(R.trim), R.reject(R.equals('')))(event.target.value)) }} />
    }
    return (
      <Form.Item {...formItemLayout} label={name}>
        {input}
      </Form.Item>
    )
  }
}

const mapStateToProps = ({ info }, { name }) => ({ value: info[name] })
const mapDispatchToProps = (dispatch) => ({
  setProp: (key, value) => dispatch(setProp(['info', key], value))
})
export default connect(mapStateToProps, mapDispatchToProps)(FormItem)
