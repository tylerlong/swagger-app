import { createLogic } from 'redux-logic'
import axios from 'axios'
import moment from 'moment'

import { setState } from '../actions'
import { fromSwagger } from '../utils'

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
      state = fromSwagger(JSON.parse(data))
    } else { // browser
      const res = await axios.get(filePath)
      state = res.data
    }
    dispatch(setState(state))
    done()
  }
})

const exportReduxStateLogic = createLogic({
  type: 'EXPORT_REDUX_STATE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    const state = getState()
    const text = JSON.stringify(state, null, 2)
    if (global.electron) { // electron
      const filePath = global.electron.dialog.showSaveDialog({
        filters: [{ name: 'swagger files', extensions: ['json'] }]
      })
      if (filePath) {
        global.fs.writeFileSync(filePath, text)
        global.electron.shell.showItemInFolder(filePath)
      }
    } else { // browser
      downloadFile(`redux-state-${moment().format('YYYYMMDDHHmmss')}.json`, text)
    }
    done()
  }
})

export default [
  loadStateLogic,
  exportReduxStateLogic
]
