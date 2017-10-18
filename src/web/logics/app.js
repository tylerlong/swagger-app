import { createLogic } from 'redux-logic'
import axios from 'axios'

import { setState } from '../actions'

const loadStateLogic = createLogic({
  type: 'LOAD_STATE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    const filePath = action.filePath
    let state = null
    if (global.electron) { // electron
      const data = global.fs.readFileSync(filePath, 'utf-8')
      state = JSON.parse(data)
    } else { // browser
      const res = await axios.get(filePath)
      state = res.data
    }
    dispatch(setState(state))
    done()
  }
})

const toSwaggerJsonLogic = createLogic({
  type: 'TO_SWAGGER_JSON',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    console.log('TO_SWAGGER_JSON')
    done()
  }
})

export default [
  loadStateLogic,
  toSwaggerJsonLogic
]
