/* eslint-env jest */
// import fs from 'fs'

import { toSwagger, fromSwagger } from '../src/web/utils'
import state from './state.json'
import swagger from './swagger.json'

describe('swagger 2.0', () => {
  test('export', () => {
    const result = toSwagger(state)
    // fs.writeFileSync('test/swagger_expected.json', JSON.stringify(result, null, 2))
    // expect(JSON.stringify(swagger, null, 2)).toEqual(fs.readFileSync('test/swagger_expected.json', 'utf8'))
    expect(result).toEqual(swagger)
  })
  test('import', () => {
    const result = fromSwagger(swagger)
    // fs.writeFileSync('test/state_expected.json', JSON.stringify(result, null, 2))
    // expect(JSON.stringify(state, null, 2)).toEqual(fs.readFileSync('test/state_expected.json', 'utf8'))
    expect(result).toEqual(state)
  })
  test('detailed import', () => {
    const result = fromSwagger(swagger)
    expect(result.info).toEqual(state.info)
    expect(result.permissions).toEqual(state.permissions)
    expect(result.pathParameters).toEqual(state.pathParameters)
    expect(result.paths).toEqual(state.paths)
    expect(result.models).toEqual(state.models)
    expect(result).toEqual(state)
  })
  test('export then import', () => {
    let result = toSwagger(state)
    result = fromSwagger(result)
    expect(result).toEqual(state)
  })
  test('import then export', () => {
    let result = fromSwagger(swagger)
    result = toSwagger(result)
    expect(result).toEqual(swagger)
  })
})
