/* eslint-env jest */
import { toSwagger, fromSwagger } from '../src/web/utils'
import state from './state.json'
import swagger from './swagger.json'

describe('swagger 2.0', () => {
  test('export', () => {
    const result = toSwagger(state)
    expect(result).toEqual(swagger)
  })
  test('import', () => {
    const result = fromSwagger(swagger)
    expect(result.info).toEqual(state.info)
    expect(result.permissions).toEqual(state.permissions)
    expect(result.pathParameters).toEqual(state.pathParameters)
    expect(result.paths).toEqual(state.paths)
    expect(result.models).toEqual(state.models)
  })
  test('export then import back', () => {

  })
})
