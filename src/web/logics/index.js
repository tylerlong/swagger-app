import { createLogic } from 'redux-logic'
import axios from 'axios'

import { setState, showAlert } from '../actions'

const loadStateLogic = createLogic({
  type: 'LOAD_STATE',
  latest: true,
  async process ({ getState, action }, dispatch, done) {
    if (global.electron) { // electron
      global.electron.dialog.showOpenDialog({ properties: ['openFile'] })
      dispatch(showAlert('success', global.electron ? 'true' : 'false'))
    } else { // browser
      const res = await axios.get('/state.json')
      dispatch(setState(res.data))
    }
    done()
  }
})

export default [
  loadStateLogic
]
