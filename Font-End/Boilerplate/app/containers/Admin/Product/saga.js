// import {
//   call,
//   delay,
//   put,
//   select,
//   takeEvery,
//   takeLatest,
//   fork,
// } from 'redux-saga/effects';
// import request from 'utils/request';
// import { makeSelectToken } from '../../App/selectors';
// import {
//   getAllCategoryByAdminError,
//   getAllCategoryByAdminSuccess,
//   getAllColorByAdminError,
//   getAllColorByAdminSuccess,
//   getAllSizeByAdminError,
//   getAllSizeByAdminSuccess,
// } from './actions';
// import {
//   GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
//   GET_ALL_COLOR_BY_ADMIN_REQUEST,
//   GET_ALL_SIZE_BY_ADMIN_ERROR,
// } from './constants';

// export function* getAllRequestCategoryByAdminSaga() {
//   const token = yield select(makeSelectToken());
//   const requestURL = `${URL}/api/Category/GetCategories`;
//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'content-Type': 'application/json',
//       Authorization: 'Bearer '.concat(token),
//     },
//   };
//   try {
//     const repos = yield call(request, requestURL, requestOptions);
//     yield delay(2000);
//     yield put(getAllCategoryByAdminSuccess(repos.result));
//   } catch (err) {
//     yield put(getAllCategoryByAdminError(err));
//   }
// }
// export function* getAllRequestSizeByAdminSaga() {
//   //const token = yield select(makeSelectToken());
//   const requestURL = `${URL}/api/Size/get-all-size`;
//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'content-Type': 'application/json',
//       //Authorization: 'Bearer '.concat(token),
//     },
//   };
//   try {
//     const repos = yield call(request, requestURL, requestOptions);
//     yield delay(2000);
//     yield put(getAllSizeByAdminSuccess(repos.result));
//   } catch (err) {
//     yield put(getAllSizeByAdminError(err));
//   }
// }

// // color
// export function* getAllRequestColorByAdminSaga() {
//   const token = yield select(makeSelectToken());
//   const requestURL = `${URL}/api/Product/color/get-all-color`;
//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'content-Type': 'application/json',
//       Authorization: 'Bearer '.concat(token),
//     },
//   };
//   try {
//     const repos = yield call(request, requestURL, requestOptions);
//     yield delay(2000);
//     yield put(getAllColorByAdminSuccess(repos.result));
//   } catch (err) {
//     yield put(getAllColorByAdminError(err));
//   }
// }
// export default function* sizePageSaga() {
//   yield takeLatest(GET_ALL_SIZE_BY_ADMIN_ERROR, getAllRequestSizeByAdminSaga);
//   yield takeLatest(
//     GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
//     getAllRequestCategoryByAdminSaga,
//   );
//   yield takeLatest(
//     GET_ALL_COLOR_BY_ADMIN_REQUEST,
//     getAllRequestColorByAdminSaga,
//   );
// }
