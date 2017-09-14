import { createMockStore } from 'redux-logic-test'
import reducer from '../src/web/reducers'
import logic from '../src/web/logics'

const store = createMockStore({
  initialState: {},
  reducer,
  logic
})

export default store
