import { call, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST } from './constants';

const URL = 'http://localhost:13193';
export function* getAllCustomersByAdminRequestSaga() {
  const requestURL = `${URL}/api/User/get-all-customer`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      //Authorization: 'Bearer '.concat(token),
    },
  };
  const repos = yield call(request, requestURL, requestOptions);
  console.log('repos', repos);
  // try {
  //   yield put(getAllCustomerByAdminSuccess(repos.result));
  //   console.log(repos);
  // } catch (err) {
  //   console.log(2);
  //   yield put(getAllCustomerByAdminError(err));
  // }
}

export default function* sizePageSaga() {
  yield takeEvery(
    GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST,
    getAllCustomersByAdminRequestSaga,
  );
}
