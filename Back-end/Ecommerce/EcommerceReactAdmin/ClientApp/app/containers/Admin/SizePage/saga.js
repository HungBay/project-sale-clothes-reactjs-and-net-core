// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_ALL_REQUEST, CREATE_RECORD_OF_SIZE_REQUEST, DELETE_RECORD_OF_SIZE_REQUEST, UPDATE_RECORD_OF_SIZE_REQUEST
} from 'containers/App/constants';
import {
  getAllSuccess, getAllError,
  createRecordOfSizeSuccess, createRecordOfSizeError,
  deleteRecordOfSizeError, deleteRecordOfSizeSuccess,
  updateRecordOfSizeError, updateRecordOfSizeSuccess
} from 'containers/App/actions';
import {
  makeSelectToken,
  makeSelectChangeNameOfSize,
  makeSelectSelectedRepos,
} from 'containers/App/selectors';
import request from 'utils/request';

// Individual exports for testing

//
//export function* GetByIdRepos() {
//  const token = yield select(makeSelectToken());
//  console.log(token);
//  const repos = yield select(makeSelectSelectedRepos());
//  console.log(repos.id);
//  const requestURL = `http://localhost:13193/api/Size/get-by-size-id/${repos.id}`;

//  let requestOptions = {
//    method: 'GET',
//    headers: {
//      'content-Type': 'application/json',
//      'Authorization': "Bearer " + token
//    }
//  };
//  try {
//    const repos = yield call(request, requestURL, requestOptions);
//    yield put(updateRecordOfSizeSuccess(repos));
//  } catch (err) {
//    yield put(updateRecordOfSizeError(err));
//  }
//}
//
export function* AfterLoginGetAllRepos() {
  const token = yield select(makeSelectToken());
  const requestURL = `http://localhost:13193/api/Size/get-all-size`;
 
  let requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getAllSuccess(repos));
  } catch (err) {
    yield put(getAllError(err));
  }
}

export function* CreateRecordOfSize() {
  debugger
  const token = yield select(makeSelectToken());
  const nameOfSize = yield select(makeSelectChangeNameOfSize()); 
  const requestURL = `http://localhost:13193/api/Size/create-size`;
  var value = {
    name: nameOfSize
  }
  let requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(value)
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(createRecordOfSizeSuccess(repos));
  } catch (err) {
    yield put(createRecordOfSizeError(err));
  }
}

//delete size
export function* DeleteRecordOfSize() {
  debugger
  const token = yield select(makeSelectToken());
  const repos = yield select(makeSelectSelectedRepos());
  
  const requestURL = `http://localhost:13193/api/Size/delete-size/${repos.id}`;
  
  let requestOptions = {
    method: 'DELETE',
    headers: {
      'content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(deleteRecordOfSizeSuccess());
  } catch (err) {
    yield put(deleteRecordOfSizeError(err));
  }
}
// Individual exports for testing
export default function* sizePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ALL_REQUEST, AfterLoginGetAllRepos);
  yield takeLatest(CREATE_RECORD_OF_SIZE_REQUEST, CreateRecordOfSize);
  yield takeLatest(DELETE_RECORD_OF_SIZE_REQUEST, DeleteRecordOfSize);
  //yield takeLatest(UPDATE_RECORD_OF_SIZE_REQUEST, GetByIdRepos);
}
