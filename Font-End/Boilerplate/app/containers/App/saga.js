import { hideLoading, showLoading } from 'components/Loading/actions';
import jwt from 'jsonwebtoken';
import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import request from 'utils/request';
import history from '../../utils/history';
import {
  uploadImageByProfileError,
  uploadImageByProfileSuccess,
} from '../Admin/Account/actions';
import { UPLOAD_IMAGE_BY_PROFILE_REQUEST } from '../Admin/Account/constants';
import { createUserError, createUserSuccess } from '../Admin/Login/actions';
import { CREATE_USER_REQUEST } from '../Admin/Login/constants';
import {
  getAllUsersByAdminError,
  getAllUsersByAdminSuccess,
  getUserByAdminError,
  getUserByAdminSuccess,
  updateUserByAdminError,
  updateUserByAdminSuccess,
  getEmployeeOrderByAdminSuccess,
  getEmployeeOrderByAdminError,
} from '../Admin/User/actions';
import {
  GET_ALL_USERS_BY_ADMIN_REQUEST,
  GET_USER_BY_ADMIN_REQUEST,
  UPDATE_USER_BY_ADMIN_REQUEST,
  GET_EMPLOYEE_ORDER_BY_ADMIN_REQUEST,
} from '../Admin/User/contants';
import {
  checkOutOrderError,
  checkOutOrderSuccess,
  getApiCitiesError,
  getApiCitiesSuccess,
  getApiDistrictsError,
  getApiDistrictsSuccess,
  getApiWardsError,
  getApiWardsSuccess,
} from '../HomeBootstrap/Checkout/actions';
import {
  CHECK_OUT_ORDER_REQUEST,
  GET_API_CITIES_REQUEST,
  GET_API_DISTRICTS_REQUEST,
  GET_API_WARDS_REQUEST,
} from '../HomeBootstrap/Checkout/contants';
import {
  getProductKidsError,
  getProductKidsSuccess,
  getProductTshirtError,
  getProductTshirtSuccess,
} from '../HomeBootstrap/HomePage/actions';
import {
  GET_PRODUCT_KIDS_REQUEST,
  GET_PRODUCT_T_SHIRT_REQUEST,
} from '../HomeBootstrap/HomePage/constants';
import {
  getOrderByCustomerError,
  getOrderByCustomerSuccess,
  getOrdersByCustomerError,
  getOrdersByCustomerSuccess,
} from '../HomeBootstrap/Orders/actions';
import {
  GET_ORDERS_BY_CUSTOMER_REQUEST,
  GET_ORDER_BY_CUSTOMER_REQUEST,
} from '../HomeBootstrap/Orders/contants';
import {
  addRateByProductError,
  addRateByProductSuccess,
  addReviewByProductError,
  addReviewByProductSuccess,
  getImagesByProductError,
  getImagesByProductSuccess,
  getProductInvolveError,
  getProductInvolveSuccess,
  getRateByProductError,
  getRateByProductSuccess,
  getReviewByProductError,
  getReviewByProductSuccess,
} from '../HomeBootstrap/Product/actions';
import {
  ADD_RATE_BY_PRODUCT_REQUEST,
  ADD_REVIEW_BY_PRODUCT_REQUEST,
  GET_IMAGES_BY_PRODUCT_REQUEST,
  GET_PRODUCT_INVOLVE_REQUEST,
  GET_RATE_BY_PRODUCT_REQUEST,
  GET_REVIEW_BY_PRODUCT_REQUEST,
} from '../HomeBootstrap/Product/contants';
import {
  getProductByCategoryError,
  getProductByCategorySuccess,
} from '../HomeBootstrap/Products/actions';
import { GET_PRODUCT_BY_CATEGORY_REQUEST } from '../HomeBootstrap/Products/constants';
import {
  updateProfileByCustomerError,
  updateProfileByCustomerSuccess,
} from '../HomeBootstrap/Profile/actions';
import { UPDATE_PROFILE_BY_CUSTOMER_REQUEST } from '../HomeBootstrap/Profile/constants';
import {
  addCommentByUserError,
  addCommentByUserSuccess,
  addProductByAdminError,
  addProductByAdminSuccess,
  checkoutError,
  checkoutSuccess,
  createCategoryErorr,
  createCategorySuccess,
  deleteOrderByAdminError,
  deleteOrderByAdminSuccess,
  getAllCategoryByAdminError,
  getAllCategoryByAdminSuccess,
  getAllColorByAdminError,
  getAllColorByAdminSuccess,
  getAllOrderByAdminError,
  getAllOrderByAdminSuccess,
  getAllOrderByCustomerError,
  getAllOrderByCustomerSuccess,
  getAllProductByAdminError,
  getAllProductByAdminSuccess,
  getAllProductByCategoryError,
  getAllProductByCategorySuccess,
  getAllProductByHomeError,
  getAllProductByHomeSuccess,
  getAllProductInvolveByCategoryError,
  getAllProductInvolveByCategorySuccess,
  getAllProductNewError,
  getAllProductNewSuccess,
  getAllSizeByAdminError,
  getAllSizeByAdminSuccess,
  getCategoryByIdErorr,
  getCategoryByIdSuccess,
  getChartByDayError,
  getChartByDaySuccess,
  getChartByMonthError,
  getChartByMonthSuccess,
  getNavigationError,
  getNavigationSuccess,
  getOrderByAdminError,
  getOrderByAdminSuccess,
  getProductByAdminError,
  getProductByAdminSuccess,
  getProductByMaxError,
  getProductByMaxSuccess,
  getProductBySearchError,
  getProductBySearchSuccess,
  loginError,
  loginSuccess,
  updateCategoryByIdErorr,
  updateCategoryByIdSuccess,
  updateOrderByAdminError,
  updateOrderByAdminSuccess,
  updateProductByAdminError,
  updateProductByAdminSuccess,
  getReUserBySuccess,
  getReUserByError,
} from './actions';
import {
  ADD_COMMENT_BY_USER_REQUEST,
  ADD_PRODUCT_BY_ADMIN_REQUEST,
  CHECK_OUT_REQUEST,
  CREATE_CATEGORY_REQUEST,
  DELETE_ORDER_BY_ADMIN_REQUEST,
  GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
  GET_ALL_COLOR_BY_ADMIN_REQUEST,
  GET_ALL_ORDER_BY_ADMIN_REQUEST,
  GET_ALL_ORDER_BY_CUSTOMER_REQUEST,
  GET_ALL_PRODUCT_BY_ADMIN_REQUEST,
  GET_ALL_PRODUCT_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_BY_HOME_REQUEST,
  GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_NEW_REQUEST,
  GET_ALL_SIZE_BY_ADMIN_REQUEST,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CHART_BY_DAY_REQUST,
  GET_CHART_BY_MONTH_REQUST,
  GET_NAVIGATION_REQUEST,
  GET_ORDER_BY_ADMIN_REQUEST,
  GET_PRODUCT_BY_ADMIN_REQUEST,
  GET_PRODUCT_BY_MAX_REQUEST,
  GET_PRODUCT_BY_SEARCH_REQUEST,
  LOGIN_REQUEST,
  UPDATE_CATEGORY_BY_ID_REQUEST,
  UPDATE_ORDER_BY_ADMIN_REQUEST,
  UPDATE_PRODUCT_BY_ADMIN_REQUEST,
  GET_RE_USER_REQUEST,
} from './constants';
import {
  makeSelectCategoryById,
  makeSelectPayLoad,
  makeSelectSelectProductByAdmin,
  makeSelectSelectProductByAdminId,
  makeSelectToken,
  makeSelectUser,
} from './selectors';
import {
  getAllCustomerByAdminSuccess,
  getAllCustomerByAdminError,
} from '../Admin/Customer/actions';
import { GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST } from '../Admin/Customer/constants';

const URL = 'http://localhost:13193';

export function* loginSaga({ data }) {
  const requestURL = `${URL}/api/user/login`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    if (repos) {
      if (repos.result) {
        yield put(loginSuccess(repos.result));
        const token = jwt.decode(repos.result.token);
        if (token.role === 'Customer') {
          yield call(history.push, '/home');
        }
      } else {
        yield put(loginError(repos.message));
      }
    }
  } catch (err) {
    //yield put(loginError(err));
  }
}
export function* createUserRequestSaga({ data }) {
  const requestURL = `${URL}/api/user/register-user`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    if (repos) {
      if (repos.result) {
        //console.log(repos.result);
        //const token = jwt.decode(repos.result.token);
        if (repos.statusCode === 200) {
          //yield call(history.push, '/home');
          yield put(createUserSuccess(repos.result));
        } else {
          yield put(createUserError(repos.message));
        }
      } else {
        yield put(createUserError(repos.message));
      }
    }
  } catch (err) {
    //yield put(loginError(err));
  }
}
export function* getReUserRequestSaga({ id }) {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/User/get-re-profile/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getReUserBySuccess(repos.result));
  } catch (err) {
    yield put(getReUserByError(err));
  }
}

export function* updateProfileByCustomerRequestSaga({ data }) {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/User/update-user`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify(data),
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(updateProfileByCustomerSuccess(repos.result));
  } catch (err) {
    yield put(updateProfileByCustomerError(err));
  }
}

export function* getAllRequestProductByAdminSaga() {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/get-all-products-by-admin`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield delay(2000);
    yield put(getAllProductByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getAllProductByAdminError(err));
  }
}

export function* getRequestProductByAdminSaga() {
  const token = yield select(makeSelectToken());
  const id = yield select(makeSelectSelectProductByAdminId());
  const requestURL = `${URL}/api/Product/get-product-by-id/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };

  yield put(showLoading());
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getProductByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getProductByAdminError(err));
  }
  yield delay(1000);
  yield put(hideLoading());
}

export function* getAllRequestOrderByAdminSaga() {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/get-all-order-by-admin`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getAllOrderByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getAllOrderByAdminError(err));
  }
}

export function* getRequestOrderByAdminSaga() {
  const token = yield select(makeSelectToken());
  const id = yield select(makeSelectSelectProductByAdminId());
  const requestURL = `${URL}/api/Product/get-order-by-admin/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getOrderByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getOrderByAdminError(err));
  }
}

export function* getRequestProductByHomeSaga() {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/get-all-products`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getAllProductByHomeSuccess(repos.result));
  } catch (err) {
    yield put(getAllProductByHomeError(err));
  }
}

export function* getRequestProductByCategorySaga() {
  const token = yield select(makeSelectToken());
  const id = yield select(makeSelectSelectProductByAdminId());
  const requestURL = `${URL}/api/Product/get-all-products-by-category/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getAllProductByCategorySuccess(repos.result));
  } catch (err) {
    yield put(getAllProductByCategoryError(err));
  }
}

// category
export function* getAllRequestCategoryByAdminSaga() {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Category/GetCategories`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield delay(2000);
    yield put(getAllCategoryByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getAllCategoryByAdminError(err));
  }
}

export function* getCategoryByIdRequestSaga() {
  const token = yield select(makeSelectToken());
  const id = yield select(makeSelectSelectProductByAdminId());
  const requestURL = `${URL}/api/Category/GetCategories/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield delay(2000);
    yield put(getCategoryByIdSuccess(repos.result));
  } catch (err) {
    yield put(getCategoryByIdErorr(err));
  }
}

export function* createCategoryRequestSaga({ data }) {
  const token = yield select(makeSelectToken());
  const { name } = data;
  const requestURL = `${URL}/api/Category/createCategory`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify({ name, description: name }),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield delay(2000);
    yield put(createCategorySuccess(repos.result));
    yield call(history.push, '/admin/category');
  } catch (err) {
    yield put(createCategoryErorr(err));
  }
}

export function* updateCategoryByIdRequestSaga({ data }) {
  const token = yield select(makeSelectToken());
  const id = yield select(makeSelectSelectProductByAdminId());

  const { name } = data;
  const requestURL = `${URL}/api/Category/updateCategory/${id}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify({ name, description: name }),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield delay(2000);
    yield put(updateCategoryByIdSuccess(repos.result));
    yield call(history.push, '/admin/category');
  } catch (err) {
    yield put(updateCategoryByIdErorr(err));
  }
}
// size
export function* getAllRequestSizeByAdminSaga() {
  //const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Size/get-all-size`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      //Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    //yield delay(2000);
    yield put(getAllSizeByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getAllSizeByAdminError(err));
  }
}
// color
export function* getAllRequestColorByAdminSaga() {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/color/get-all-color`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield delay(2000);
    yield put(getAllColorByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getAllColorByAdminError(err));
  }
}

export function* addCommentByUserSaga({ data }) {
  const user = yield select(makeSelectUser());
  const id = yield select(makeSelectSelectProductByAdminId());
  const token = yield select(makeSelectToken());
  const requestHeaders = new Headers();

  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Accept', 'application/json');

  requestHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  requestHeaders.append('Access-Control-Allow-Credentials', 'true');

  requestHeaders.append('GET', 'POST', 'OPTIONS');

  requestHeaders.append('Authorization', 'Bearer '.concat(token));
  const formData = new FormData();

  formData.append('Comment', data.comment);
  formData.append('ProductId', id);
  formData.append('UserId', user.id);
  formData.append('Image', null);

  const requestURL = `${URL}/api/Product/add-comment`;
  const requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    headers: requestHeaders,
    body: formData,
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield delay(2000);
    yield put(addCommentByUserSuccess(repos.result));
  } catch (err) {
    yield put(addCommentByUserError(err));
  }
}

export function* updateRequestProductAdminSaga({ data }) {
  const token = yield select(makeSelectToken());
  const product = yield select(makeSelectSelectProductByAdmin());

  const requestData = {
    name: data.name,
    description: data.description,
    unitPrice: data.unitPrice,
    unit: data.unit,
  };

  console.log(requestData);
  const requestURL = `${URL}/api/Product/update-product/${product.id}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify(requestData),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(updateProductByAdminSuccess(repos.result));
    yield call(history.push, '/admin/products');
  } catch (err) {
    yield put(updateProductByAdminError(err));
  }
}

// order
export function* deleteOrderByAdminRequest({ id }) {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/delete-order/${id}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(deleteOrderByAdminSuccess(repos.result));
    // yield call(history.push, '/admin/order');
  } catch (err) {
    yield put(deleteOrderByAdminError(err));
  }
}

export function* getAllOrderByCustomerRequest() {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  if (user) {
    const { id } = user;
    const requestURL = `${URL}/api/Product/get-order-by-customer/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer '.concat(token),
      },
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield put(getAllOrderByCustomerSuccess(repos.result));
      // yield call(history.push, '/admin/order');
    } catch (err) {
      yield put(getAllOrderByCustomerError(err));
    }
  }
}
// home
export function* getProductByMaxRequestSaga() {
  // const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/product-by-max`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      // Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getProductByMaxSuccess(repos.result));
    // yield call(history.push, '/admin/order');
  } catch (err) {
    yield put(getProductByMaxError(err));
  }
}

// product
export function* addProductImageByAdminRequestSaga(data, result, token) {
  const { image } = data;
  const { id } = result;
  console.log(id);
  // const token = yield select(makeSelectToken());
  console.log(token);
  const requestHeaders = new Headers();

  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Accept', 'application/json');

  requestHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  requestHeaders.append('Access-Control-Allow-Credentials', 'true');

  requestHeaders.append('GET', 'POST', 'OPTIONS');

  requestHeaders.append('Authorization', 'Bearer '.concat(token));
  const requestURL = `${URL}/api/Product/uploadImage/product`;
  const formData = new FormData();

  formData.append('Id', id);
  formData.append('file', image);

  const requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    headers: requestHeaders,
    body: formData,
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    if (repos.statusCode === 201) {
      yield put(addProductByAdminSuccess(repos.result));
    } else {
      yield put(addProductByAdminError(repos.result));
    }
  } catch (err) {
    yield put(addProductByAdminError(err));
  }
}
export function* addProductMultipleImageByAdminRequestSaga(
  data,
  result,
  token,
) {
  const { files } = data;
  const { id } = result;
  console.log(id);
  console.log(token);
  const requestHeaders = new Headers();

  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Accept', 'application/json');

  requestHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  requestHeaders.append('Access-Control-Allow-Credentials', 'true');

  requestHeaders.append('GET', 'POST', 'OPTIONS');

  requestHeaders.append('Authorization', 'Bearer '.concat(token));
  const requestURL = `${URL}/api/Product/uploadImage-product-multiple`;
  const formData = new FormData();

  formData.append('ProductId', id);
  for (let i = 0; i < files.length; i++) {
    formData.append('Image', files[i]);
  }

  console.log(files);
  const requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    headers: requestHeaders,
    body: formData,
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    if (repos.statusCode === 201) {
      yield put(addProductByAdminSuccess(repos.result));
    } else {
      yield put(addProductByAdminError(repos.result));
    }
  } catch (err) {
    yield put(addProductByAdminError(err));
  }
}
export function* addProductByAdminRequestSaga({ data }) {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/create-product`;
  const {
    name,
    description,
    productCategories,
    productSizes,
    promotionPrice,
    unit,
    unitPrice,
    image,
    files,
    quantity,
    productColors,
  } = data;

  const requestData = {
    name,
    description,
    unitPrice,
    promotionPrice,
    unit,
    productCategories,
    productSizes,
    quantity,
    productColors,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify(requestData),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    if (repos.statusCode === 201) {
      if (image.length === 0 && files.length === 0) {
        yield put(addProductByAdminSuccess(repos.result));
      } else {
        yield addProductImageByAdminRequestSaga(data, repos.result, token);
        yield addProductMultipleImageByAdminRequestSaga(
          data,
          repos.result,
          token,
        );
      }
      yield call(history.push, '/admin/products');
    } else {
      yield put(addProductByAdminError(repos.message));
    }
  } catch (err) {
    yield put(addProductByAdminError(err));
  }
}
// product Involve
export function* getProductInvolveByCategoryRequestSaga() {
  const id = yield select(makeSelectCategoryById());
  const requestURL = `${URL}/get-product-category-by-take/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      // Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getAllProductInvolveByCategorySuccess(repos.result));
    // yield call(history.push, '/admin/order');
  } catch (err) {
    yield put(getAllProductInvolveByCategoryError(err));
  }
}
// product new
export function* getRequestProductNewSaga() {
  const requestURL = `${URL}/api/Product/get-product-new`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      // Authorization: 'Bearer '.concat(token),
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getAllProductNewSuccess(repos.result));
  } catch (err) {
    yield put(getAllProductNewError(err));
  }
}
// chart
export function* getChartByDayRequestSaga() {
  const token = yield select(makeSelectToken());

  const requestURL = `${URL}/api/Product/get-all-order-by-admin-statistical-by-day`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getChartByDaySuccess(repos.result));
  } catch (err) {
    yield put(getChartByDayError(err));
  }
}
export function* getChartByMonthRequestSaga() {
  const token = yield select(makeSelectToken());

  const requestURL = `${URL}/api/Product/get-all-order-by-admin-statistical-by-month`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getChartByMonthSuccess(repos.result));
  } catch (err) {
    yield put(getChartByMonthError(err));
  }
}

export function* checkoutOrderedSaga() {
  const payload = yield select(makeSelectPayLoad());
  const token = yield select(makeSelectToken());
  const { data, amount, carts } = payload;
  const orderDetails = [];
  carts.map(cart => {
    orderDetails.push({
      productId: cart.product.id,
      quantity: cart.quantity,
      color: cart.data.color !== undefined ? cart.data.color : '',
      size: cart.data.size !== undefined ? cart.data.size : '',
    });
  });
  const requestData = {
    orderDto: {
      name: `${data.lastName} ${data.firstName}`,
      address: `${data.address}`,
      phone: `${data.phone}`,
      note: `${data.note ? data.note : ''}`,
      amount: `${amount}`,
      userId: `${data.id}`,
    },
    orderDetailDtos: orderDetails,
  };
  console.log(requestData);
  const requestURL = `${URL}/api/Product/add-order-by-customer`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify(requestData),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(checkoutSuccess(repos.result));
    yield call(history.push, '/home/order');
  } catch (err) {
    yield put(checkoutError(err));
  }
}
export function* updateOrderRequestSaga({ payload }) {
  console.log(payload);
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/update-order-by-admin`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json-patch+json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify(payload),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(updateOrderByAdminSuccess(repos.result));
    yield call(history.push, '/admin/orders');
  } catch (err) {
    yield put(updateOrderByAdminError(err));
    //console.log(err);
  }
}

// review home
export function* getReviewByProductRequestSaga({ id }) {
  const requestURL = `${URL}/api/Product/get-review-by-product/${id}`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getReviewByProductSuccess(repos.result));
    // yield call(history.goBack());
  } catch (err) {
    yield put(getReviewByProductError(err));
  }
}
export function* addReviewByProductRequestSaga({ data }) {
  const id = yield select(makeSelectSelectProductByAdminId());
  const user = yield select(makeSelectUser());
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/Product/add-comment`;
  const formData = new FormData();
  formData.append('Comment', data.comment);
  formData.append('ProductId', id);
  formData.append('UserId', user.id);
  formData.append('Image', data.image);
  const requestOptions = {
    method: 'POST',
    headers: {
      //'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${token}`,
    },
    body: formData,
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(addReviewByProductSuccess(repos.result));
  } catch (err) {
    yield put(addReviewByProductError(err));
  }
}
// rate home
export function* getRateByProductRequestSaga({ id }) {
  const requestURL = `${URL}/api/Product/get-rates-by-product-id/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getRateByProductSuccess(repos.result));
  } catch (err) {
    yield put(getRateByProductError(err));
  }
}

export function* addRateByProductRequestSaga({ payload }) {
  console.log('add rate', payload);
  const token = yield select(makeSelectToken());
  const data = {
    rating: payload.rating,
    userId: payload.user.id,
    productId: payload.product.id,
  };
  const requestURL = `${URL}/api/Product/add-rate-of-product`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify(data),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(addRateByProductSuccess(repos.result));
  } catch (err) {
    yield put(addRateByProductError(err));
  }
}
// product image
export function* getImagesByProductRequestSaga({ id }) {
  const requestURL = `${URL}/api/Product/get-all-product-image-by-id/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getImagesByProductSuccess(repos.result));
  } catch (err) {
    yield put(getImagesByProductError(err));
  }
}
// product
export function* getProductInvolveRequestSaga({ lstId }) {
  let dataRequest = [];
  for (let i = 0; i < lstId.length - 1; i++) {
    dataRequest = dataRequest.concat(lstId[i].categoryId);
  }
  const requestURL = `${URL}/api/Product/get-product-involve`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(dataRequest),
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getProductInvolveSuccess(repos.result));
  } catch (err) {
    yield put(getProductInvolveError(err));
  }
}

export function* getProductKidsRequestSaga({ id }) {
  const requestURL = `${URL}/api/Product/get-all-products-by-category/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getProductKidsSuccess(repos.result));
  } catch (err) {
    yield put(getProductKidsError(err));
  }
}
export function* getProductTshirtRequestSaga({ id }) {
  const requestURL = `${URL}/api/Product/get-all-products-by-category/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getProductTshirtSuccess(repos.result));
  } catch (err) {
    yield put(getProductTshirtError(err));
  }
}

export function* getProductByCategoryRequestSaga({ id }) {
  const requestURL = `${URL}/api/Product/get-all-products-by-category/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };

  yield put(showLoading());
  yield delay(1000);
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getProductByCategorySuccess(repos.result));
  } catch (err) {
    yield put(getProductByCategoryError(err));
  }
  yield put(hideLoading());
}

export function* getProductBySearchRequestSaga({ params }) {
  if (params) {
    const requestURL = `${URL}/api/Product/get-product-search-by-name?q=${params}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield delay(1000);
      // yield put(showLoading());
      yield put(getProductBySearchSuccess(repos.result));
      yield call(history.push, '/dashboard');
      // yield put(hideLoading());
    } catch (err) {
      yield put(getProductBySearchError(err));
    }
  } else {
    yield getRequestProductByHomeSaga();
    yield put(hideLoading());
  }
}
// order customer
export function* getOrdersByCustomerRequestSaga() {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  if (user) {
    const { id } = user;
    const requestURL = `${URL}/api/Product/get-order-by-customer/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer '.concat(token),
      },
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield put(getOrdersByCustomerSuccess(repos.result));
      // yield call(history.push, '/admin/order');
    } catch (err) {
      yield put(getOrdersByCustomerError(err));
    }
  }
}
export function* getOrderByCustomerRequestSaga({ id }) {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  if (user) {
    const requestURL = `${URL}/api/Product/get-order-by-customer-by-id/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer '.concat(token),
      },
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield put(getOrderByCustomerSuccess(repos.result));
      // yield call(history.push, '/admin/order');
    } catch (err) {
      yield put(getOrderByCustomerError(err));
    }
  } else {
    alert('yêu cầu đăng nhập');
  }
}
export function* checkoutOrderRequestsaga({ payload }) {
  // console.log(payload);
  const token = yield select(makeSelectToken());
  const { carts, address, amount, profile, accumulatedPoints } = payload;

  const orderDetails = [];
  const calculartor = (unitPrice, promotionPrice) => {
    return unitPrice - (unitPrice * promotionPrice) / 100;
  };
  const subTotal = (price, promotionPrice) => {
    if (promotionPrice !== 0) {
      return calculartor(price, promotionPrice);
    }
    return price;
  };
  carts.map(cart => {
    orderDetails.push({
      productId: cart.product.id,
      quantity: cart.quantity,
      priceUnit: subTotal(cart.product.unitPrice, cart.product.promotionPrice),
      color: cart.data
        ? cart.data.color !== 'undefined'
          ? cart.data.color
          : ''
        : '',
      size: cart.data
        ? cart.data.size !== 'undefined'
          ? cart.data.size
          : ''
        : '',
    });
  });
  const getAddress = `${address.village} - ${address.wards} - ${
    address.districts
  } - ${address.cities}`;
  const requestData = {
    orderDto: {
      name: `${address.name}`,
      address: `${getAddress}`,
      phone: `${address.phone}`,
      note: `${address.note ? address.note : ''}`,
      amount: `${amount}`,
      userId: `${profile.id}`,
      accumulatedPoints,
    },
    orderDetailDtos: orderDetails,
  };
  //console.log('saga', requestData);
  const requestURL = `${URL}/api/Product/add-order-by-customer`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
    body: JSON.stringify(requestData),
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(checkOutOrderSuccess(repos.result));
    yield call(history.push, '/orders');
  } catch (err) {
    yield put(checkOutOrderError(err));
  }
}

// get api address
const proxyurl = 'https://cors-anywhere.herokuapp.com/';
// const url_address = 'https://thongtindoanhnghiep.co/api';
export function* getApiCitiesRequestSaga() {
  const requestURL = `https://thongtindoanhnghiep.co/api/city`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type,  X-Requested-With, Accept',
    },
  };
  try {
    const repos = yield call(request, proxyurl + requestURL, requestOptions);

    yield put(getApiCitiesSuccess(repos.LtsItem));
  } catch (err) {
    console.log('err', err);
    yield put(getApiCitiesError(err));
  }
}
export function* getApiDistrictsRequestSaga({ id }) {
  const requestURL = `https://thongtindoanhnghiep.co/api/city/${id}/district`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type,  X-Requested-With, Accept',
    },
  };
  try {
    const repos = yield call(request, proxyurl + requestURL, requestOptions);

    yield put(getApiDistrictsSuccess(repos));
  } catch (err) {
    yield put(getApiDistrictsError(err));
  }
}
export function* getApiWardsRequestSaga({ id }) {
  const requestURL = `https://thongtindoanhnghiep.co/api/district/${id}/ward`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type,  X-Requested-With, Accept',
    },
  };
  try {
    const repos = yield call(request, proxyurl + requestURL, requestOptions);

    yield put(getApiWardsSuccess(repos));
  } catch (err) {
    yield put(getApiWardsError(err));
  }
}

// admin
export function* getAllCustomersByAdminRequestSaga() {
  const token = yield select(makeSelectToken());
  const requestURL = `${URL}/api/User/get-all-customer`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: 'Bearer '.concat(token),
    },
  };

  try {
    const repos = yield call(request, requestURL, requestOptions);
    console.log('repos', repos);
    yield put(getAllCustomerByAdminSuccess(repos.result));
  } catch (err) {
    yield put(getAllCustomerByAdminError(err));
  }
}
export function* getAllUsersByAdminRequestSaga() {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  if (user) {
    const requestURL = `${URL}/api/User/get-all-employee`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer '.concat(token),
      },
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield put(getAllUsersByAdminSuccess(repos.result));
    } catch (err) {
      yield put(getAllUsersByAdminError(err));
    }
  } else {
    alert('yêu cầu đăng nhập');
  }
}
export function* getUserByAdminRequestSaga({ id }) {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  if (user) {
    const requestURL = `${URL}/api/User/get-user/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer '.concat(token),
      },
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield put(getUserByAdminSuccess(repos.result));
    } catch (err) {
      yield put(getUserByAdminError(err));
    }
  } else {
    alert('yêu cầu đăng nhập');
  }
}
export function* getEmployeeOrderByAdminRequestSaga({ id }) {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  if (user) {
    const requestURL = `${URL}/api/Product/get-order-by-employee-id/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer '.concat(token),
      },
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield put(getEmployeeOrderByAdminSuccess(repos.result));
      console.log('saga', repos)
    } catch (err) {
      yield put(getEmployeeOrderByAdminError(err));
    }
  } else {
    alert('yêu cầu đăng nhập');
  }
}

export function* updateUserByAdminRequestSaga({ data }) {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  if (user) {
    const requestURL = `${URL}/api/User/update-user`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer '.concat(token),
      },
      body: JSON.stringify(data),
    };
    try {
      const repos = yield call(request, requestURL, requestOptions);
      yield put(updateUserByAdminSuccess(repos.result));
    } catch (err) {
      yield put(updateUserByAdminError(err));
    }
  } else {
    alert('yêu cầu đăng nhập');
  }
}

// profile
export function* uploadImageByProfileRequestSaga({ imageUser }) {
  const user = yield select(makeSelectUser());

  const token = yield select(makeSelectToken());

  const requestURL = `${URL}/api/User/update-image-proflie`;
  const formData = new FormData();
  formData.append('Id', user.id);
  formData.append('ImageUser', imageUser);

  const requestOptions = {
    method: 'POST',
    headers: {
      //'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${token}`,
    },
    body: formData,
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(uploadImageByProfileSuccess(repos.result));
  } catch (err) {
    yield put(uploadImageByProfileError(err));
  }
}

// navigation
export function* getNavigationRequestSaga() {
  const requestURL = `${URL}/api/Product/get-navigation-by-home`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  try {
    const repos = yield call(request, requestURL, requestOptions);
    yield put(getNavigationSuccess(repos.result));
  } catch (err) {
    yield put(getNavigationError(err));
  }
}
export default function* sizePageSaga() {
  // product search home
  yield takeLatest(
    GET_PRODUCT_BY_SEARCH_REQUEST,
    getProductBySearchRequestSaga,
  );
  // product image
  yield takeLatest(
    GET_IMAGES_BY_PRODUCT_REQUEST,
    getImagesByProductRequestSaga,
  );
  // rate
  yield takeLatest(GET_RATE_BY_PRODUCT_REQUEST, getRateByProductRequestSaga);
  yield takeLatest(ADD_RATE_BY_PRODUCT_REQUEST, addRateByProductRequestSaga);
  // navigation
  yield takeLatest(GET_NAVIGATION_REQUEST, getNavigationRequestSaga);
  // upload profile
  yield takeLatest(
    UPLOAD_IMAGE_BY_PROFILE_REQUEST,
    uploadImageByProfileRequestSaga,
  );
  // admin
  yield takeLatest(
    GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST,
    getAllCustomersByAdminRequestSaga,
  );
  yield takeLatest(
    GET_ALL_USERS_BY_ADMIN_REQUEST,
    getAllUsersByAdminRequestSaga,
  );
  yield takeLatest(
    GET_EMPLOYEE_ORDER_BY_ADMIN_REQUEST,
    getEmployeeOrderByAdminRequestSaga,
  );
  yield takeLatest(UPDATE_USER_BY_ADMIN_REQUEST, updateUserByAdminRequestSaga);
  yield takeLatest(GET_USER_BY_ADMIN_REQUEST, getUserByAdminRequestSaga);
  // review
  yield takeLatest(
    ADD_REVIEW_BY_PRODUCT_REQUEST,
    addReviewByProductRequestSaga,
  );
  // address
  yield takeLatest(GET_API_CITIES_REQUEST, getApiCitiesRequestSaga);
  yield takeLatest(GET_API_DISTRICTS_REQUEST, getApiDistrictsRequestSaga);
  yield takeLatest(GET_API_WARDS_REQUEST, getApiWardsRequestSaga);

  // order
  yield takeLatest(CHECK_OUT_ORDER_REQUEST, checkoutOrderRequestsaga);
  yield takeLatest(
    GET_ORDERS_BY_CUSTOMER_REQUEST,
    getOrdersByCustomerRequestSaga,
  );
  yield takeLatest(
    GET_ORDER_BY_CUSTOMER_REQUEST,
    getOrderByCustomerRequestSaga,
  );
  yield takeLatest(GET_PRODUCT_INVOLVE_REQUEST, getProductInvolveRequestSaga);
  yield takeLatest(GET_PRODUCT_T_SHIRT_REQUEST, getProductTshirtRequestSaga);
  yield takeLatest(GET_PRODUCT_KIDS_REQUEST, getProductKidsRequestSaga);
  yield takeLatest(
    GET_PRODUCT_BY_CATEGORY_REQUEST,
    getProductByCategoryRequestSaga,
  );

  yield takeLatest(
    GET_ALL_PRODUCT_BY_ADMIN_REQUEST,
    getAllRequestProductByAdminSaga,
  );
  yield takeEvery(GET_PRODUCT_BY_ADMIN_REQUEST, getRequestProductByAdminSaga);
  yield takeLatest(
    UPDATE_PRODUCT_BY_ADMIN_REQUEST,
    updateRequestProductAdminSaga,
  );
  yield takeLatest(UPDATE_ORDER_BY_ADMIN_REQUEST, updateOrderRequestSaga);

  yield takeLatest(
    GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
    getAllRequestCategoryByAdminSaga,
  );
  yield takeLatest(GET_ALL_SIZE_BY_ADMIN_REQUEST, getAllRequestSizeByAdminSaga);
  yield takeLatest(GET_CATEGORY_BY_ID_REQUEST, getCategoryByIdRequestSaga);
  yield takeLatest(CREATE_CATEGORY_REQUEST, createCategoryRequestSaga);
  yield takeLatest(
    UPDATE_CATEGORY_BY_ID_REQUEST,
    updateCategoryByIdRequestSaga,
  );
  yield takeLatest(
    GET_ALL_PRODUCT_BY_CATEGORY_REQUEST,
    getRequestProductByCategorySaga,
  );
  yield takeLatest(
    GET_ALL_PRODUCT_BY_HOME_REQUEST,
    getRequestProductByHomeSaga,
  );
  yield takeLatest(
    GET_ALL_COLOR_BY_ADMIN_REQUEST,
    getAllRequestColorByAdminSaga,
  );
  yield takeLatest(
    GET_ALL_ORDER_BY_ADMIN_REQUEST,
    getAllRequestOrderByAdminSaga,
  );
  yield takeLatest(
    GET_ALL_ORDER_BY_CUSTOMER_REQUEST,
    getAllOrderByCustomerRequest,
  );
  yield takeLatest(DELETE_ORDER_BY_ADMIN_REQUEST, deleteOrderByAdminRequest);
  // home
  yield takeLatest(GET_PRODUCT_BY_MAX_REQUEST, getProductByMaxRequestSaga);
  // product
  yield takeLatest(ADD_PRODUCT_BY_ADMIN_REQUEST, addProductByAdminRequestSaga);
  yield takeLatest(GET_ALL_PRODUCT_NEW_REQUEST, getRequestProductNewSaga);
  yield takeLatest(
    GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST,
    getProductInvolveByCategoryRequestSaga,
  );

  yield takeLatest(GET_CHART_BY_DAY_REQUST, getChartByDayRequestSaga);
  yield takeLatest(GET_CHART_BY_MONTH_REQUST, getChartByMonthRequestSaga);
  yield takeLatest(GET_ORDER_BY_ADMIN_REQUEST, getRequestOrderByAdminSaga);
  yield takeLatest(ADD_COMMENT_BY_USER_REQUEST, addCommentByUserSaga);
  yield takeEvery(CHECK_OUT_REQUEST, checkoutOrderedSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(CREATE_USER_REQUEST, createUserRequestSaga);
  yield takeLatest(
    UPDATE_PROFILE_BY_CUSTOMER_REQUEST,
    updateProfileByCustomerRequestSaga,
  );
  yield takeLatest(
    GET_REVIEW_BY_PRODUCT_REQUEST,
    getReviewByProductRequestSaga,
  );
  yield takeLatest(GET_RE_USER_REQUEST, getReUserRequestSaga);
}
