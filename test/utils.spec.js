/* eslint-env jest */
import { alert, getFormItemLayout, formItemLayout, subFormItemLayout } from '../src/utils'

describe('test alert', () => {
  const state = { alerts: [] }

  test('alert success/info/warning/error', () => {
    expect(alert('success', 'Hello world')(state)).toEqual({ alerts: [{ type: 'success', message: 'Hello world' }] })
    expect(alert('info', 'Hello world')(state)).toEqual({ alerts: [{ type: 'info', message: 'Hello world' }] })
    expect(alert('warning', 'Hello world')(state)).toEqual({ alerts: [{ type: 'warning', message: 'Hello world' }] })
    expect(alert('error', 'Hello world')(state)).toEqual({ alerts: [{ type: 'error', message: 'Hello world' }] })
  })

  test('alert unknown type', () => {
    expect(alert('bug', 'Hello world')(state)).not.toEqual({ alerts: [{ type: 'bug', message: 'Hello world' }] })
    expect(alert('bug', 'Hello world')(state)).toEqual(state)
  })

  test('alert invalid message', () => {
    expect(alert('success', null)(state)).not.toEqual({ alerts: [{ type: 'success', message: null }] })
    expect(alert('success', null)(state)).toEqual(state)
    expect(alert('success', '')(state)).not.toEqual({ alerts: [{ type: 'success', message: '' }] })
    expect(alert('success', '')(state)).toEqual(state)
    expect(alert('success', undefined)(state)).not.toEqual({ alerts: [{ type: 'success', message: undefined }] })
    expect(alert('success', undefined)(state)).toEqual(state)
    expect(alert('success', ['Hello world'])(state)).not.toEqual({ alerts: [{ type: 'success', message: ['Hello world'] }] })
    expect(alert('success', ['Hello world'])(state)).toEqual(state)
  })
})

describe('test getFormItemLayout', () => {
  test('getFormItemLayout for large width', () => {
    expect(getFormItemLayout(6, 12)).toEqual({
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    })
  })

  test('getFormItemLayout for small width', () => {
    expect(getFormItemLayout(6, 18)).toEqual({
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    })
  })

  test('pre-defined FormItemLayouts', () => {
    expect(formItemLayout).toEqual(getFormItemLayout(6, 12))
    expect(subFormItemLayout).toEqual(getFormItemLayout(6, 18))
  })
})
