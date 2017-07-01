/* eslint-env jest */
import { deleteModel, addModel } from '../actions/models'
import reducer from './index'

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
