import { createLogic } from 'redux-logic'
import { Base64 } from 'js-base64'

import { defaultState } from '../reducers/app'

const openFileLogic = createLogic({
  type: 'OPEN_FILE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) { // electron
      const filesOpened = global.electron.dialog.showOpenDialog({ properties: ['openFile'] })
      if (filesOpened) {
        window.location = window.location.href.split('#')[0] + '#/edit/' + Base64.encodeURI(filesOpened[0])
      }
    } else { // browser
      window.location = window.location.href.split('#')[0] + '#/edit/' + Base64.encodeURI('/state.json')
    }
    done()
  }
})

const newFileLogic = createLogic({
  type: 'NEW_FILE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) {
      const filePath = global.electron.dialog.showSaveDialog({
        filters: [{ name: 'swagger files', extensions: ['json'] }]
      })
      if (filePath) {
        global.fs.writeFileSync(filePath, JSON.stringify(defaultState, null, 2))
        window.location = window.location.href.split('#')[0] + '#/edit/' + Base64.encodeURI(filePath)
      }
    }
    done()
  }
})

export default [
  openFileLogic,
  newFileLogic
]
