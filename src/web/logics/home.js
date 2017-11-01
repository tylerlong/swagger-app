import * as R from 'ramda'
import { createLogic } from 'redux-logic'
import { Base64 } from 'js-base64'
import YAML from 'js-yaml'

import { defaultState } from '../reducers'
import { redirectTo, toSwagger } from '../utils'

const editFile = filePath => {
  redirectTo(`/edit/${Base64.encodeURI(filePath)}`)
}

const newFileLogic = createLogic({
  type: 'NEW_FILE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) {
      const filePath = global.electron.dialog.showSaveDialog({
        filters: [{ name: 'swagger files', extensions: ['json'] }]
      })
      if (filePath) {
        const defaultSwagger = toSwagger(R.omit(['alerts'], defaultState))
        global.fs.writeFileSync(filePath, JSON.stringify(defaultSwagger, null, 2))
        editFile(filePath)
      }
    }
    done()
  }
})

const openFileLogic = createLogic({
  type: 'OPEN_FILE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) { // electron
      const filesOpened = global.electron.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'swagger files', extensions: ['json'] }]
      })
      if (filesOpened) {
        editFile(filesOpened[0])
      }
    } else { // browser
      editFile('/state.json')
    }
    done()
  }
})

const json2YamlLogic = createLogic({
  type: 'JSON_TO_YAML',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) { // electron
      const filesOpened = global.electron.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'JSON files', extensions: ['json'] }]
      })
      if (filesOpened) {
        const fileOpened = filesOpened[0]
        const fileToSave = global.electron.dialog.showSaveDialog({
          filters: [{ name: 'YAML files', extensions: ['yaml', 'yml'] }]
        })
        if (fileToSave) {
          const data = global.fs.readFileSync(fileOpened, 'utf-8')
          const yaml = YAML.dump(JSON.parse(data))
          global.fs.writeFileSync(fileToSave, yaml, 'utf-8')
          global.electron.shell.showItemInFolder(fileToSave)
        }
      }
    }
    done()
  }
})

export default [
  newFileLogic,
  openFileLogic,
  json2YamlLogic
]
