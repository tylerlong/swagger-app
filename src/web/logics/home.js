import * as R from 'ramda'
import { createLogic } from 'redux-logic'
import { Base64 } from 'js-base64'
import YAML from 'js-yaml'

import { defaultState } from '../reducers'
import { redirectTo, toSwagger, fromSwagger } from '../utils'

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
        const fileOpened = filesOpened[0]

        // check validness of the file
        const data = global.fs.readFileSync(fileOpened, 'utf-8')
        try {
          fromSwagger(JSON.parse(data))
        } catch (e) {
          console.log(e)
          global.electron.getCurrentWindow().toggleDevTools()
          return
        }

        editFile(fileOpened)
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

const yaml2JsonLogic = createLogic({
  type: 'YAML_TO_JSON',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) { // electron
      const filesOpened = global.electron.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'YAML files', extensions: ['yaml', 'yml'] }]
      })
      if (filesOpened) {
        const fileOpened = filesOpened[0]
        const fileToSave = global.electron.dialog.showSaveDialog({
          filters: [{ name: 'JSON files', extensions: ['json'] }]
        })
        if (fileToSave) {
          const data = global.fs.readFileSync(fileOpened, 'utf-8')
          const json = JSON.stringify(YAML.load(data), null, 2)
          global.fs.writeFileSync(fileToSave, json, 'utf-8')
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
  json2YamlLogic,
  yaml2JsonLogic
]
