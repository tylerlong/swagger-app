/* eslint-env jest */
import R from 'ramda'

import { setProp, setState, deleteModel, addModel, addModelProperty } from '../actions'
import reducer from './index'

describe('test app', () => {
  const state = { models: [{ name: '1' }, { name: '2' }, { name: '3' }] }
  test('setProp', () => {
    expect(reducer(state, setProp(['models', 1, 'name'], 'Hello world')).models).toEqual([{ name: '1' }, { name: 'Hello world' }, { name: '3' }])
  })

  test('setState', () => {
    expect(R.omit('metadata', reducer(state, setState({ message: 'Hello world' })))).toEqual({ message: 'Hello world' })
  })
})

describe('test models', () => {
  const state = { models: [{ name: '1' }, { name: '2' }, { name: '3' }] }
  test('deleteModel', () => {
    expect(reducer(state, deleteModel(1)).models).toEqual([{ name: '1' }, { name: '3' }])
  })

  test('addModel', () => {
    const models = reducer(state, addModel()).models
    expect(models.length).toEqual(4)
    expect(models[3].name).toEqual('Name')
  })
})

describe('test model properties', () => {
  test('add model property', () => {
    const state = { models: [{ name: '1', properties: [] }, { name: '2', properties: [] }] }
    const models = reducer(state, addModelProperty(1)).models
    expect(models.length).toEqual(2)
    expect(models[0].properties.length).toEqual(0)
    expect(models[1].properties.length).toEqual(1)
    expect(models[1].properties[0].name).toEqual('name')
  })
})
