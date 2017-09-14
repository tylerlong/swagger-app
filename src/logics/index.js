import { createLogic } from 'redux-logic'
import axios from 'axios'
import electron from 'electron'

import { setState, showAlert } from '../actions'

const { dialog } = electron.remote

const loadStateLogic = createLogic({
  type: 'LOAD_STATE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    const res = await axios.get('/state.json')
    dispatch(setState(res.data))
    done()
  }
})

const openFileLogic = createLogic({
  type: 'OPEN_FILE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    dialog.showOpenDialog({ properties: ['openFile'] })
    dispatch(showAlert('success', 'file opened'))
    done()
  }
})

export default [
  loadStateLogic,
  openFileLogic
]
