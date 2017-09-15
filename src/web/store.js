import { createStore, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import Rx from 'rxjs/Rx'

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
    if (state.fileOpened && data !== currentData) {
      global.fs.writeFileSync(state.fileOpened, data)
      currentData = data
    }
    console.log('Saved')
  })
  store.subscribe(() => {
    subject.next()
  })
}

export default store
