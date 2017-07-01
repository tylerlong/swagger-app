import { takeLatest, call, put, all } from 'redux-saga/effects'
import axios from 'axios'

import { setState } from '../actions'

export function * loadState () {
  const res = yield call(axios.get, './state.json')
  yield put(setState(res.data))
}

function * loadStateSaga () {
  yield takeLatest('LOAD_STATE', loadState)
}

function * rootSaga () {
  yield all([
    loadStateSaga()
  ])
}

export default rootSaga
