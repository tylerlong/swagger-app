import { createLogic } from 'redux-logic'
import axios from 'axios'

import { setState } from '../actions'

const loadStateLogic = createLogic({
  type: 'LOAD_STATE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) { // electron
      const filesOpened = global.electron.dialog.showOpenDialog({ properties: ['openFile'] })
      if (filesOpened) {
        const fileOpened = filesOpened[0]
        const data = global.fs.readFileSync(fileOpened, 'utf-8')
        const state = JSON.parse(data)
        state.fileOpened = fileOpened
        dispatch(setState(state))
        window.location = window.location.href.split('#')[0] + '#/edit'
        window.document.title = fileOpened
      }
    } else { // browser
      const res = await axios.get('/state.json')
      dispatch(setState(res.data))
      window.location = window.location.href.split('#')[0] + '#/edit'
    }
    done()
  }
})

const newStateLogic = createLogic({
  type: 'NEW_STATE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) {
      const filePath = global.electron.dialog.showSaveDialog({
        filters: [{ name: 'swagger files', extensions: ['json'] }]
      })
      if (filePath) {
        console.log(filePath)
        const state = getState()
        state.fileOpened = filePath
        dispatch(setState(state))
        window.location = window.location.href.split('#')[0] + '#/edit'
        window.document.title = filePath
      }
    }
    done()
  }
})

export default [
  loadStateLogic,
  newStateLogic
]
