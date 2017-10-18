import { createLogic } from 'redux-logic'
import axios from 'axios'
import moment from 'moment'

import { setState } from '../actions'

const downloadFile = (filename, text) => {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

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
    const state = getState()
    const data = JSON.stringify(state, null, 2)
    if (global.electron) { // electron
      const filePath = global.electron.dialog.showSaveDialog({
        filters: [{ name: 'swagger files', extensions: ['json'] }]
      })
      if (filePath) {
        global.fs.writeFileSync(filePath, data)
        global.electron.shell.showItemInFolder(filePath)
      }
    } else { // browser
      downloadFile(`swagger-${moment().format('YYYYMMDDHHmmss')}.json`, data)
    }
    done()
  }
})

export default [
  loadStateLogic,
  toSwaggerJsonLogic
]
