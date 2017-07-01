import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { setState } from '../actions'

function * loadState () {
  const res = yield call(axios.get, './state.json')
  yield put(setState(res.data))
}

function * loadStateSaga () {
  yield takeLatest('LOAD_STATE', loadState)
}

function * rootSaga () {
  yield [
    loadStateSaga()
  ]
}

export default rootSaga
