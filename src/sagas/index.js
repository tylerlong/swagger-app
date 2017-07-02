import { takeLatest, call, put, all } from 'redux-saga/effects'
import 'isomorphic-fetch'

import { setState } from '../actions'

export function * loadState () {
  const res = yield call(global.fetch, '/state.json')
  const json = yield call(() => res.json())
  yield put(setState(json))
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
