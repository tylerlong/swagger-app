import { createStore, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import Rx from 'rxjs/Rx'
import { Base64 } from 'js-base64'

import reducer from './reducers'
import logics from './logics'

const logicMiddleware = createLogicMiddleware(logics)
const store = createStore(
  reducer,
  applyMiddleware(logicMiddleware)
)

// auto persist state
if (global.electron) {
  let currentData
  const subject = new Rx.Subject().debounceTime(1000)
  subject.subscribe(() => {
    const state = store.getState()
    const data = JSON.stringify(state, null, 2)
    if (data !== currentData) {
      const tokens = window.location.href.split('#/edit/')
      if (tokens.length > 1) {
        const filePath = Base64.decode(tokens[1])
        global.fs.writeFileSync(filePath, data)
        currentData = data
      }
    }
  })
  store.subscribe(() => {
    subject.next()
  })
}

export default store
