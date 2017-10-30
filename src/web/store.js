import * as R from 'ramda'
import { createStore, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import Rx from 'rxjs/Rx'
import { Base64 } from 'js-base64'

import reducer from './reducers'
import logics from './logics'
import { toSwagger } from './utils'

const logicMiddleware = createLogicMiddleware(logics)
const store = createStore(
  reducer,
  applyMiddleware(logicMiddleware)
)

// auto persist state
if (global.electron) {
  let persistedData
  const subject = new Rx.Subject().debounceTime(1000)
  subject.subscribe(() => {
    const state = R.omit(['alerts'], store.getState())
    const data = JSON.stringify(toSwagger(state), null, 2)
    if (data !== persistedData) {
      const tokens = window.location.href.split('#/edit/')
      if (tokens.length > 1) {
        const filePath = Base64.decode(tokens[1])
        global.fs.writeFileSync(filePath, data)
        persistedData = data
      }
    }
  })
  store.subscribe(() => {
    subject.next()
  })
}

export default store
