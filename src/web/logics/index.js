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
      }
    } else { // browser
      const res = await axios.get('/state.json')
      dispatch(setState(res.data))
      window.location = window.location.href.split('#')[0] + '#/edit'
    }
    done()
  }
})

export default [
  loadStateLogic
]
