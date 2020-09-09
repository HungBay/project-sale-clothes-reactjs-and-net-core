
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from 'containers/App/constants';
import { loginSuccess, loginError } from 'containers/App/actions';

import request from 'utils/request';
import {
  makeSelectChangeUsername,
  makeSelectChangePassword,
  
} from '../../App/selectors';
// Individual exports for testing

export function* beforeLogin() {
  const user = yield select(makeSelectChangeUsername());
  const pass = yield select(makeSelectChangePassword());
  const requestURL = `http://localhost:13193/api/User/login`;

  var loginValue = {
    username: user,
    password: pass
  }
  let requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(loginValue)
  };

  try {
    const token = yield call(request, requestURL, requestOptions);
    yield put(loginSuccess(token));
  } catch (err) {
    yield put(loginError(err));
  }
}
export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, beforeLogin);
}
