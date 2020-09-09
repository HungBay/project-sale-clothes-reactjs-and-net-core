/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_NAME_OF_SIZE,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  CREATE_RECORD_OF_SIZE_ERROR,
  CREATE_RECORD_OF_SIZE_REQUEST,
  CREATE_RECORD_OF_SIZE_SUCCESS,
  DELETE_RECORD_OF_SIZE_ERROR,
  DELETE_RECORD_OF_SIZE_REQUEST,
  DELETE_RECORD_OF_SIZE_SUCCESS,
  GET_ALL_CATEGORY_BY_ADMIN_ERROR,
  GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
  GET_ALL_CATEGORY_BY_ADMIN_SUCCESS,
  GET_ALL_COLOR_BY_ADMIN_ERROR,
  GET_ALL_COLOR_BY_ADMIN_REQUEST,
  GET_ALL_COLOR_BY_ADMIN_SUCCESS,
  GET_ALL_PRODUCT_BY_ADMIN_ERROR,
  GET_ALL_PRODUCT_BY_ADMIN_REQUEST,
  GET_ALL_PRODUCT_BY_ADMIN_SUCCESS,
  GET_ALL_REQUEST,
  GET_ALL_REQUEST_ERROR,
  GET_ALL_REQUEST_SUCCESS,
  GET_PRODUCT_BY_ADMIN_ERROR,
  GET_PRODUCT_BY_ADMIN_REQUEST,
  GET_PRODUCT_BY_ADMIN_SUCCESS,
  HIDE_SIDEBAR,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_REPOS_SUCCESS,
  LOGIN_ERROR,
  LOGIN_FACEBOOK_ERROR,
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SEARCH_PRODUCT_ADMIN,
  SELECTED_REPOS,
  SET_CURRENT_TOKEN,
  SET_CURRENT_USER,
  SHOW_SIDEBAR,
  UPDATE_PRODUCT_BY_ADMIN_ERROR,
  UPDATE_PRODUCT_BY_ADMIN_REQUEST,
  UPDATE_PRODUCT_BY_ADMIN_SUCCESS,
  UPDATE_RECORD_OF_SIZE_ERROR,
  UPDATE_RECORD_OF_SIZE_REQUEST,
  UPDATE_RECORD_OF_SIZE_SUCCESS,
  GET_ALL_PRODUCT_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_ALL_PRODUCT_BY_CATEGORY_ERROR,
  GET_ALL_PRODUCT_BY_HOME_REQUEST,
  GET_ALL_PRODUCT_BY_HOME_SUCCESS,
  GET_ALL_PRODUCT_BY_HOME_ERROR,
  LOGIN_HOME_REQUEST,
  LOGIN_HOME_SUCCESS,
  LOGIN_HOME_ERROR,
  ADD_COMMENT_BY_USER_REQUEST,
  ADD_COMMENT_BY_USER_SUCCESS,
  ADD_COMMENT_BY_USER_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUB_QUANTITY,
  EMPTY_CART,
  ADD_QUANTITY,
  GET_ALL_ORDER_BY_ADMIN_REQUEST,
  GET_ALL_ORDER_BY_ADMIN_SUCCESS,
  GET_ALL_ORDER_BY_ADMIN_ERROR,
  GET_ORDER_BY_ADMIN_REQUEST,
  GET_ORDER_BY_ADMIN_SUCCESS,
  GET_ORDER_BY_ADMIN_ERROR,
  CHECK_OUT_SUCCESS,
  CHECK_OUT_ERROR,
  CHECK_OUT_REQUEST,
  GET_CHART_BY_DAY_REQUST,
  GET_CHART_BY_DAY_SUCCESS,
  GET_CHART_BY_DAY_ERROR,
  GET_CHART_BY_MONTH_REQUST,
  GET_CHART_BY_MONTH_SUCCESS,
  GET_CHART_BY_MONTH_ERROR,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_ERROR,
  UPDATE_CATEGORY_BY_ID_REQUEST,
  UPDATE_CATEGORY_BY_ID_SUCCESS,
  UPDATE_CATEGORY_BY_ID_ERROR,
  CREATE_CATEGORY_BY_ID_REQUEST,
  CREATE_CATEGORY_BY_ID_SUCCESS,
  CREATE_CATEGORY_BY_ID_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  DELETE_ORDER_BY_ADMIN_REQUEST,
  DELETE_ORDER_BY_ADMIN_SUCCESS,
  DELETE_ORDER_BY_ADMIN_ERROR,
  GET_PRODUCT_BY_MAX_REQUEST,
  GET_PRODUCT_BY_MAX_SUCCESS,
  GET_PRODUCT_BY_MAX_ERROR,
  ADD_PRODUCT_BY_ADMIN_REQUEST,
  ADD_PRODUCT_BY_ADMIN_SUCCESS,
  ADD_PRODUCT_BY_ADMIN_ERROR,
  GET_ALL_SIZE_BY_ADMIN_REQUEST,
  GET_ALL_SIZE_BY_ADMIN_SUCCESS,
  GET_ALL_SIZE_BY_ADMIN_ERROR,
  GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_SUCCESS,
  GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_ERROR,
  GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_NEW_REQUEST,
  GET_ALL_PRODUCT_NEW_SUCCESS,
  GET_ALL_PRODUCT_NEW_ERROR,
  UPDATE_TO_CART,
  GET_ALL_ORDER_BY_CUSTOMER_REQUEST,
  GET_ALL_ORDER_BY_CUSTOMER_SUCCESS,
  GET_ALL_ORDER_BY_CUSTOMER_ERROR,
  UPDATE_ORDER_BY_ADMIN_REQUEST,
  GET_NAVIGATION_ERROR,
  GET_NAVIGATION_REQUEST,
  GET_NAVIGATION_SUCCESS,
  GET_PRODUCT_BY_SEARCH_REQUEST,
  GET_PRODUCT_BY_SEARCH_SUCCESS,
  GET_PRODUCT_BY_SEARCH_ERROR,
  UPDATE_ORDER_BY_ADMIN_SUCCESS,
  UPDATE_ORDER_BY_ADMIN_ERROR,
  GET_RE_USER_REQUEST,
  GET_RE_USER_SUCCESS,
  GET_RE_USER_ERROR,
} from './constants';

export function showSideBar() {
  return {
    type: SHOW_SIDEBAR,
  };
}
export function hideSideBar() {
  return {
    type: HIDE_SIDEBAR,
  };
}

export function getAllProductByAdminRequest() {
  return {
    type: GET_ALL_PRODUCT_BY_ADMIN_REQUEST,
  };
}
export function getAllProductByAdminSuccess(products) {
  return {
    type: GET_ALL_PRODUCT_BY_ADMIN_SUCCESS,
    products,
  };
}
export function getAllProductByAdminError(err) {
  return {
    type: GET_ALL_PRODUCT_BY_ADMIN_ERROR,
    err,
  };
}

// get all category by admin
export function getAllCategoryByAdminRequest() {
  return {
    type: GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
  };
}
export function getAllCategoryByAdminSuccess(categories) {
  return {
    type: GET_ALL_CATEGORY_BY_ADMIN_SUCCESS,
    categories,
  };
}
export function getAllCategoryByAdminError(err) {
  return {
    type: GET_ALL_CATEGORY_BY_ADMIN_ERROR,
    err,
  };
}

// get all color by admin
export function getAllColorByAdminRequest() {
  return {
    type: GET_ALL_COLOR_BY_ADMIN_REQUEST,
  };
}
export function getAllColorByAdminSuccess(colors) {
  return {
    type: GET_ALL_COLOR_BY_ADMIN_SUCCESS,
    colors,
  };
}
export function getAllColorByAdminError(err) {
  return {
    type: GET_ALL_COLOR_BY_ADMIN_ERROR,
    err,
  };
}

// login
export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
export function setCurrentToken(token) {
  return {
    type: SET_CURRENT_TOKEN,
    token,
  };
}

// login fb
export function loginFacebookRequest() {
  return {
    type: LOGIN_FACEBOOK_REQUEST,
  };
}
export function loginFacebookSuccess(response) {
  return {
    type: LOGIN_FACEBOOK_SUCCESS,
    response,
  };
}
export function loginFacebookError(error) {
  return {
    type: LOGIN_FACEBOOK_ERROR,
    error,
  };
}
/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

//login
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function getAllRequest() {
  return {
    type: GET_ALL_REQUEST,
  };
}

export function getAllSuccess(repos) {
  return {
    type: GET_ALL_REQUEST_SUCCESS,
    repos,
  };
}

export function getAllError(error) {
  return {
    type: GET_ALL_REQUEST_ERROR,
    error,
  };
}

//size
export function changeNameOfSize(name) {
  return {
    type: CHANGE_NAME_OF_SIZE,
    name,
  };
}

export function createRecordOfSizeRequest() {
  return {
    type: CREATE_RECORD_OF_SIZE_REQUEST,
  };
}

export function createRecordOfSizeSuccess(newSize) {
  return {
    type: CREATE_RECORD_OF_SIZE_SUCCESS,
    newSize,
  };
}

export function createRecordOfSizeError(error) {
  return {
    type: CREATE_RECORD_OF_SIZE_ERROR,
    error,
  };
}

//selected repos
export function selectRepos(recorde) {
  return {
    type: SELECTED_REPOS,
    recorde,
  };
}

export function updateRecordOfSizeRequest() {
  return {
    type: UPDATE_RECORD_OF_SIZE_REQUEST,
  };
}

export function updateRecordOfSizeSuccess(newSize) {
  return {
    type: UPDATE_RECORD_OF_SIZE_SUCCESS,
    newSize,
  };
}

export function updateRecordOfSizeError(error) {
  return {
    type: UPDATE_RECORD_OF_SIZE_ERROR,
    error,
  };
}

//delete
export function deleteRecordOfSizeRequest() {
  return {
    type: DELETE_RECORD_OF_SIZE_REQUEST,
  };
}

export function deleteRecordOfSizeSuccess() {
  return {
    type: DELETE_RECORD_OF_SIZE_SUCCESS,
  };
}

export function deleteRecordOfSizeError(error) {
  return {
    type: DELETE_RECORD_OF_SIZE_ERROR,
    error,
  };
}

export function searchProductAdmin(keyword) {
  return {
    type: SEARCH_PRODUCT_ADMIN,
    keyword,
  };
}

export function getProductByAdminRequest(id) {
  return {
    type: GET_PRODUCT_BY_ADMIN_REQUEST,
    id,
  };
}
export function getProductByAdminSuccess(product) {
  return {
    type: GET_PRODUCT_BY_ADMIN_SUCCESS,
    product,
  };
}
export function getProductByAdminError(error) {
  return {
    type: GET_PRODUCT_BY_ADMIN_ERROR,
    error,
  };
}

export function updateProductByAdminRequest(data) {
  return {
    type: UPDATE_PRODUCT_BY_ADMIN_REQUEST,
    data,
  };
}

export function updateProductByAdminSuccess(data) {
  return {
    type: UPDATE_PRODUCT_BY_ADMIN_SUCCESS,
    data,
  };
}

export function updateProductByAdminError(error) {
  return {
    type: UPDATE_PRODUCT_BY_ADMIN_ERROR,
    error,
  };
}

// get all product by home
export function getAllProductByHomeRequest() {
  return {
    type: GET_ALL_PRODUCT_BY_HOME_REQUEST,
  };
}

export function getAllProductByHomeSuccess(products) {
  return {
    type: GET_ALL_PRODUCT_BY_HOME_SUCCESS,
    products,
  };
}

export function getAllProductByHomeError(error) {
  return {
    type: GET_ALL_PRODUCT_BY_HOME_ERROR,
    error,
  };
}

// get all product by categroy
export function getAllProductByCategoryRequest(id) {
  return {
    type: GET_ALL_PRODUCT_BY_CATEGORY_REQUEST,
    id,
  };
}

export function getAllProductByCategorySuccess(products) {
  return {
    type: GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS,
    products,
  };
}

export function getAllProductByCategoryError(error) {
  return {
    type: GET_ALL_PRODUCT_BY_CATEGORY_ERROR,
    error,
  };
}
// add comment
export function addCommentByUserRequest(data) {
  return {
    type: ADD_COMMENT_BY_USER_REQUEST,
    data,
  };
}

export function addCommentByUserSuccess(data) {
  return {
    type: ADD_COMMENT_BY_USER_SUCCESS,
    data,
  };
}

export function addCommentByUserError(error) {
  return {
    type: ADD_COMMENT_BY_USER_ERROR,
    error,
  };
}

// cart
export function addToCart(carts) {
  return {
    type: ADD_TO_CART,
    carts,
  };
}
export function updateToCart(product, quantity) {
  return {
    type: UPDATE_TO_CART,
    product,
    quantity,
  };
}

export function removeFromCart(product) {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
}
// export function subtractQuantity(id) {
//   return {
//     type: SUB_QUANTITY,
//     id,
//   };
// }
// export function addQuantity(id) {
//   return {
//     type: ADD_QUANTITY,
//     id,
//   };
// }
// export function emptyCart() {
//   return {
//     type: EMPTY_CART,
//   };
// }

// order
export function getAllOrderByAdminRequest() {
  return {
    type: GET_ALL_ORDER_BY_ADMIN_REQUEST,
  };
}
export function getAllOrderByAdminSuccess(orders) {
  return {
    type: GET_ALL_ORDER_BY_ADMIN_SUCCESS,
    orders,
  };
}
export function getAllOrderByAdminError(error) {
  return {
    type: GET_ALL_ORDER_BY_ADMIN_ERROR,
    error,
  };
}
export function getAllOrderByCustomerRequest() {
  return {
    type: GET_ALL_ORDER_BY_CUSTOMER_REQUEST,
  };
}
export function getAllOrderByCustomerSuccess(orderCustomers) {
  return {
    type: GET_ALL_ORDER_BY_CUSTOMER_SUCCESS,
    orderCustomers,
  };
}
export function getAllOrderByCustomerError(error) {
  return {
    type: GET_ALL_ORDER_BY_CUSTOMER_ERROR,
    error,
  };
}

export function getOrderByAdminRequest(id) {
  return {
    type: GET_ORDER_BY_ADMIN_REQUEST,
    id,
  };
}
export function getOrderByAdminSuccess(order) {
  return {
    type: GET_ORDER_BY_ADMIN_SUCCESS,
    order,
  };
}
export function getOrderByAdminError(error) {
  return {
    type: GET_ORDER_BY_ADMIN_ERROR,
    error,
  };
}

export function checkoutRequest(data, carts, amount) {
  return {
    type: CHECK_OUT_REQUEST,
    payload: {
      data,
      carts,
      amount,
    },
  };
}
export function checkoutSuccess(ordered) {
  return {
    type: CHECK_OUT_SUCCESS,
    ordered,
  };
}
export function checkoutError(error) {
  return {
    type: CHECK_OUT_ERROR,
    error,
  };
}
export function deleteOrderByAdminRequest(id) {
  return {
    type: DELETE_ORDER_BY_ADMIN_REQUEST,
    id,
  };
}
export function deleteOrderByAdminSuccess(order) {
  return {
    type: DELETE_ORDER_BY_ADMIN_SUCCESS,
    order,
  };
}
export function deleteOrderByAdminError(error) {
  return {
    type: DELETE_ORDER_BY_ADMIN_ERROR,
    error,
  };
}

// chart
export function getChartByDayRequest() {
  return {
    type: GET_CHART_BY_DAY_REQUST,
  };
}
export function getChartByDaySuccess(charts) {
  return {
    type: GET_CHART_BY_DAY_SUCCESS,
    charts,
  };
}
export function getChartByDayError(error) {
  return {
    type: GET_CHART_BY_DAY_ERROR,
    error,
  };
}

export function getChartByMonthRequest() {
  return {
    type: GET_CHART_BY_MONTH_REQUST,
  };
}
export function getChartByMonthSuccess(charts) {
  return {
    type: GET_CHART_BY_MONTH_SUCCESS,
    charts,
  };
}
export function getChartByMonthError(error) {
  return {
    type: GET_CHART_BY_MONTH_ERROR,
    error,
  };
}

// category
export function getCategoryByIdRequest(id) {
  return {
    type: GET_CATEGORY_BY_ID_REQUEST,
    id,
  };
}
export function getCategoryByIdSuccess(category) {
  return {
    type: GET_CATEGORY_BY_ID_SUCCESS,
    category,
  };
}
export function getCategoryByIdErorr(error) {
  return {
    type: GET_CATEGORY_BY_ID_ERROR,
    error,
  };
}

export function createCategoryRequest(data) {
  return {
    type: CREATE_CATEGORY_REQUEST,
    data,
  };
}
export function createCategorySuccess(category) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    category,
  };
}
export function createCategoryErorr(error) {
  return {
    type: CREATE_CATEGORY_ERROR,
    error,
  };
}

export function updateCategoryByIdRequest(data) {
  return {
    type: UPDATE_CATEGORY_BY_ID_REQUEST,
    data,
  };
}
export function updateCategoryByIdSuccess(category) {
  return {
    type: UPDATE_CATEGORY_BY_ID_SUCCESS,
    category,
  };
}
export function updateCategoryByIdErorr(error) {
  return {
    type: UPDATE_CATEGORY_BY_ID_ERROR,
    error,
  };
}

// home
export function getProductByMaxRequest() {
  return {
    type: GET_PRODUCT_BY_MAX_REQUEST,
  };
}
export function getProductByMaxSuccess(productMax) {
  return {
    type: GET_PRODUCT_BY_MAX_SUCCESS,
    productMax,
  };
}
export function getProductByMaxError(error) {
  return {
    type: GET_PRODUCT_BY_MAX_ERROR,
    error,
  };
}

// product
export function addProductByAdminRequest(data) {
  return {
    type: ADD_PRODUCT_BY_ADMIN_REQUEST,
    data,
  };
}
export function addProductByAdminSuccess(product) {
  return {
    type: ADD_PRODUCT_BY_ADMIN_SUCCESS,
    product,
  };
}
export function addProductByAdminError(error) {
  return {
    type: ADD_PRODUCT_BY_ADMIN_ERROR,
    error,
  };
}

// size
export function getAllSizeByAdminRequest() {
  return {
    type: GET_ALL_SIZE_BY_ADMIN_REQUEST,
  };
}
export function getAllSizeByAdminSuccess(sizes) {
  return {
    type: GET_ALL_SIZE_BY_ADMIN_SUCCESS,
    sizes,
  };
}
export function getAllSizeByAdminError(error) {
  return {
    type: GET_ALL_SIZE_BY_ADMIN_ERROR,
    error,
  };
}

// product involve
export function getAllProductInvolveByCategoryRequest() {
  return {
    type: GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST,
  };
}
export function getAllProductInvolveByCategorySuccess(products) {
  return {
    type: GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_SUCCESS,
    products,
  };
}
export function getAllProductInvolveByCategoryError(error) {
  return {
    type: GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_ERROR,
    error,
  };
}
// product new
export function getAllProductNewRequest() {
  return {
    type: GET_ALL_PRODUCT_NEW_REQUEST,
  };
}
export function getAllProductNewSuccess(products) {
  return {
    type: GET_ALL_PRODUCT_NEW_SUCCESS,
    products,
  };
}
export function getAllProductNewError(error) {
  return {
    type: GET_ALL_PRODUCT_NEW_ERROR,
    error,
  };
}

// order update
export function updateOrderByAdminRequest(
  statusOrder,
  deliveredDate,
  id,
  employeeId,
  userId,
) {
  return {
    type: UPDATE_ORDER_BY_ADMIN_REQUEST,
    payload: {
      statusOrder,
      deliveredDate,
      id,
      employeeId,
      userId,
    },
  };
}
export function updateOrderByAdminSuccess(order) {
  return {
    type: UPDATE_ORDER_BY_ADMIN_SUCCESS,
    order,
  };
}
export function updateOrderByAdminError(error) {
  return {
    type: UPDATE_ORDER_BY_ADMIN_ERROR,
    error,
  };
}

// navigation
export function getNavigationRequest() {
  return {
    type: GET_NAVIGATION_REQUEST,
  };
}
export function getNavigationSuccess(navigation) {
  return {
    type: GET_NAVIGATION_SUCCESS,
    navigation,
  };
}
export function getNavigationError(error) {
  return {
    type: GET_NAVIGATION_ERROR,
    error,
  };
}

// search home
export function getProductBySearchRequest(params) {
  return {
    type: GET_PRODUCT_BY_SEARCH_REQUEST,
    params,
  };
}
export function getProductBySearchSuccess(products) {
  return {
    type: GET_PRODUCT_BY_SEARCH_SUCCESS,
    products,
  };
}
export function getProductBySearchError(error) {
  return {
    type: GET_PRODUCT_BY_SEARCH_ERROR,
    error,
  };
}

export function getReUserByRequest(id) {
  return {
    type: GET_RE_USER_REQUEST,
    id,
  };
}
export function getReUserBySuccess(user) {
  return {
    type: GET_RE_USER_SUCCESS,
    user,
  };
}
export function getReUserByError(error) {
  return {
    type: GET_RE_USER_ERROR,
    error,
  };
}
