/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

// get all product by admin
export const GET_ALL_PRODUCT_BY_ADMIN_REQUEST =
  'GET_ALL_PRODUCT_BY_ADMIN_REQUEST';
export const GET_ALL_PRODUCT_BY_ADMIN_SUCCESS =
  'GET_ALL_PRODUCT_BY_ADMIN_SUCCESS';
export const GET_ALL_PRODUCT_BY_ADMIN_ERROR = 'GET_ALL_PRODUCT_BY_ADMIN_ERROR';

export const GET_PRODUCT_BY_ADMIN_REQUEST = 'GET_PRODUCT_BY_ADMIN_REQUEST';
export const GET_PRODUCT_BY_ADMIN_SUCCESS = 'GET_PRODUCT_BY_ADMIN_SUCCESS';
export const GET_PRODUCT_BY_ADMIN_ERROR = 'GET_PRODUCT_BY_ADMIN_ERROR';

// get all category by admin
export const GET_ALL_CATEGORY_BY_ADMIN_REQUEST =
  'GET_ALL_CATEGORY_BY_ADMIN_REQUEST';
export const GET_ALL_CATEGORY_BY_ADMIN_SUCCESS =
  'GET_ALL_CATEGORY_BY_ADMIN_SUCCESS';
export const GET_ALL_CATEGORY_BY_ADMIN_ERROR =
  'GET_ALL_CATEGORY_BY_ADMIN_ERROR';

// get all color by admin
export const GET_ALL_COLOR_BY_ADMIN_REQUEST = 'GET_ALL_COLOR_BY_ADMIN_REQUEST';
export const GET_ALL_COLOR_BY_ADMIN_SUCCESS = 'GET_ALL_COLOR_BY_ADMIN_SUCCESS';
export const GET_ALL_COLOR_BY_ADMIN_ERROR = 'GET_ALL_CATEGORY_BY_ADMIN_ERROR';

// login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_TOKEN = 'SET_CURRENT_TOKEN';

export const LOGIN_FACEBOOK_REQUEST = 'LOGIN_FACEBOOK_REQUEST';
export const LOGIN_FACEBOOK_SUCCESS = 'LOGIN_FACEBOOK_SUCCESS';
export const LOGIN_FACEBOOK_ERROR = 'LOGIN_FACEBOOK_ERROR';
// login
export const CHANGE_USERNAME = 'app/App/CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'app/App/CHANGE_PASSWORD';

// get all
export const GET_ALL_REQUEST = 'app/App/GET_ALL_REQUEST';
export const GET_ALL_REQUEST_SUCCESS = 'app/App/GET_ALL_REQUEST_SUCCESS';
export const GET_ALL_REQUEST_ERROR = 'app/App/GET_ALL_REQUEST_ERROR';

// create size
export const CHANGE_NAME_OF_SIZE = 'app/App/CHANGE_NAME_OF_SIZE';
export const CREATE_RECORD_OF_SIZE_REQUEST =
  'app/App/CREATE_RECORD_OF_SIZE_REQUEST';
export const CREATE_RECORD_OF_SIZE_SUCCESS =
  'app/App/CREATE_RECORD_OF_SIZE_SUCCESS';
export const CREATE_RECORD_OF_SIZE_ERROR =
  'app/App/CREATE_RECORD_OF_SIZE_ERROR';

// update size
export const SELECTED_REPOS = 'app/App/SELECTED_REPOS';

export const UPDATE_RECORD_OF_SIZE_REQUEST =
  'app/App/UPDATE_RECORD_OF_SIZE_REQUEST';
export const UPDATE_RECORD_OF_SIZE_SUCCESS =
  'app/App/UPDATE_RECORD_OF_SIZE_SUCCESS';
export const UPDATE_RECORD_OF_SIZE_ERROR =
  'app/App/UPDATE_RECORD_OF_SIZE_ERROR';

// delete size
export const DELETE_RECORD_OF_SIZE_REQUEST =
  'app/App/DELETE_RECORD_OF_SIZE_REQUEST';
export const DELETE_RECORD_OF_SIZE_SUCCESS =
  'app/App/DELETE_RECORD_OF_SIZE_SUCCESS';
export const DELETE_RECORD_OF_SIZE_ERROR =
  'app/App/DELETE_RECORD_OF_SIZE_ERROR';

export const SEARCH_PRODUCT_ADMIN = 'SEARCH_PRODUCT_ADMIN';

export const UPDATE_PRODUCT_BY_ADMIN_REQUEST =
  'UPDATE_PRODUCT_BY_ADMIN_REQUEST';
export const UPDATE_PRODUCT_BY_ADMIN_SUCCESS =
  'UPDATE_PRODUCT_BY_ADMIN_SUCCESS';
export const UPDATE_PRODUCT_BY_ADMIN_ERROR = 'UPDATE_PRODUCT_BY_ADMIN_ERROR';

// get all product by home
export const GET_ALL_PRODUCT_BY_HOME_REQUEST =
  'GET_ALL_PRODUCT_BY_HOME_REQUEST';
export const GET_ALL_PRODUCT_BY_HOME_SUCCESS =
  'GET_ALL_PRODUCT_BY_HOME_SUCCESS';
export const GET_ALL_PRODUCT_BY_HOME_ERROR =
  'GET_ALL_PRODUCT_BY_CATEGORY_ERROR';

// get all product by category
export const GET_ALL_PRODUCT_BY_CATEGORY_REQUEST =
  'GET_ALL_PRODUCT_BY_CATEGORY_REQUEST';
export const GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS =
  'GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS';
export const GET_ALL_PRODUCT_BY_CATEGORY_ERROR =
  'GET_ALL_PRODUCT_BY_CATEGORY_ERROR';

export const GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST =
  'GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST';
export const GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_SUCCESS =
  'GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_SUCCESS';
export const GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_ERROR =
  'GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_ERROR';

export const GET_ALL_PRODUCT_NEW_REQUEST = 'GET_ALL_PRODUCT_NEW_REQUEST';
export const GET_ALL_PRODUCT_NEW_SUCCESS = 'GET_ALL_PRODUCT_NEW_SUCCESS';
export const GET_ALL_PRODUCT_NEW_ERROR = 'GET_ALL_PRODUCT_NEW_ERROR';

// comment
export const ADD_COMMENT_BY_USER_REQUEST = 'ADD_COMMENT_BY_USER_REQUEST';
export const ADD_COMMENT_BY_USER_SUCCESS = 'ADD_COMMENT_BY_USER_SUCCESS';
export const ADD_COMMENT_BY_USER_ERROR = 'ADD_COMMENT_BY_USER_ERROR';

// cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_TO_CART = 'UPDATE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const EMPTY_CART = 'EMPTY_CART';

// order
export const GET_ALL_ORDER_BY_ADMIN_REQUEST = 'GET_ALL_ORDER_BY_ADMIN_REQUEST';
export const GET_ALL_ORDER_BY_ADMIN_SUCCESS = 'GET_ALL_ORDER_BY_ADMIN_SUCCESS';
export const GET_ALL_ORDER_BY_ADMIN_ERROR = 'GET_ALL_ORDER_BY_ADMIN_ERROR';

export const GET_ORDER_BY_ADMIN_REQUEST = 'GET_ORDER_BY_ADMIN_REQUEST';
export const GET_ORDER_BY_ADMIN_SUCCESS = 'GET_ORDER_BY_ADMIN_SUCCESS';
export const GET_ORDER_BY_ADMIN_ERROR = 'GET_ORDER_BY_ADMIN_ERROR';

export const CHECK_OUT_REQUEST = 'CHECK_OUT_REQUEST';
export const CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS';
export const CHECK_OUT_ERROR = 'CHECK_OUT_ERROR';

export const DELETE_ORDER_BY_ADMIN_REQUEST = 'DELETE_ORDER_BY_ADMIN_REQUEST';
export const DELETE_ORDER_BY_ADMIN_SUCCESS = 'DELETE_ORDER_BY_ADMIN_SUCCESS';
export const DELETE_ORDER_BY_ADMIN_ERROR = 'DELETE_ORDER_BY_ADMIN_ERROR';

export const GET_ALL_ORDER_BY_CUSTOMER_REQUEST =
  'GET_ALL_ORDER_BY_CUSTOMER_REQUEST';
export const GET_ALL_ORDER_BY_CUSTOMER_SUCCESS =
  'GET_ALL_ORDER_BY_CUSTOMER_SUCCESS';
export const GET_ALL_ORDER_BY_CUSTOMER_ERROR =
  'GET_ALL_ORDER_BY_CUSTOMER_ERROR';
// chart
export const GET_CHART_BY_DAY_REQUST = 'GET_CHART_BY_DAY_REQUST';
export const GET_CHART_BY_DAY_SUCCESS = 'GET_CHART_BY_DAY_SUCCESS';
export const GET_CHART_BY_DAY_ERROR = 'GET_CHART_BY_DAY_ERROR';

export const GET_CHART_BY_MONTH_REQUST = 'GET_CHART_BY_MONTH_REQUST';
export const GET_CHART_BY_MONTH_SUCCESS = 'GET_CHART_BY_MONTH_SUCCESS';
export const GET_CHART_BY_MONTH_ERROR = 'GET_CHART_BY_MONTH_ERROR';

// category
export const GET_CATEGORY_BY_ID_REQUEST = 'GET_CATEGORY_BY_ID_REQUEST';
export const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
export const GET_CATEGORY_BY_ID_ERROR = 'GET_CATEGORY_BY_ID_ERROR';

export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_ERROR = 'CREATE_CATEGORY_ERROR';

export const UPDATE_CATEGORY_BY_ID_REQUEST = 'UPDATE_CATEGORY_BY_ID_REQUEST';
export const UPDATE_CATEGORY_BY_ID_SUCCESS = 'UPDATE_CATEGORY_BY_ID_SUCCESS';
export const UPDATE_CATEGORY_BY_ID_ERROR = 'UPDATE_CATEGORY_BY_ID_ERROR';

// home

export const GET_PRODUCT_BY_MAX_REQUEST = 'GET_PRODUCT_BY_MAX_REQUEST';
export const GET_PRODUCT_BY_MAX_SUCCESS = 'GET_PRODUCT_BY_MAX_SUCCESS';
export const GET_PRODUCT_BY_MAX_ERROR = 'GET_PRODUCT_BY_MAX_ERROR';

// product
export const ADD_PRODUCT_BY_ADMIN_REQUEST = 'ADD_PRODUCT_BY_ADMIN_REQUEST';
export const ADD_PRODUCT_BY_ADMIN_SUCCESS = 'ADD_PRODUCT_BY_ADMIN_SUCCESS';
export const ADD_PRODUCT_BY_ADMIN_ERROR = 'ADD_PRODUCT_BY_ADMIN_ERROR';

// size
export const GET_ALL_SIZE_BY_ADMIN_REQUEST = 'GET_ALL_SIZE_BY_ADMIN_REQUEST';
export const GET_ALL_SIZE_BY_ADMIN_SUCCESS = 'GET_ALL_SIZE_BY_ADMIN_SUCCESS';
export const GET_ALL_SIZE_BY_ADMIN_ERROR = 'GET_ALL_SIZE_BY_ADMIN_ERROR';

// order update
export const UPDATE_ORDER_BY_ADMIN_REQUEST = 'UPDATE_ORDER_BY_ADMIN_REQUEST';
export const UPDATE_ORDER_BY_ADMIN_SUCCESS = 'UPDATE_ORDER_BY_ADMIN_SUCCESS';
export const UPDATE_ORDER_BY_ADMIN_ERROR = 'UPDATE_ORDER_BY_ADMIN_ERROR';

// navigation
export const GET_NAVIGATION_REQUEST = 'GET_NAVIGATION_REQUEST';
export const GET_NAVIGATION_SUCCESS = 'GET_NAVIGATION_SUCCESS';
export const GET_NAVIGATION_ERROR = 'GET_NAVIGATION_ERROR';

// search home
export const GET_PRODUCT_BY_SEARCH_REQUEST = 'GET_PRODUCT_BY_SEARCH_REQUEST';
export const GET_PRODUCT_BY_SEARCH_SUCCESS = 'GET_PRODUCT_BY_SEARCH_SUCCESS';
export const GET_PRODUCT_BY_SEARCH_ERROR = 'GET_PRODUCT_BY_SEARCH_ERROR';

// get user
export const GET_RE_USER_REQUEST = 'GET_RE_USER_REQUEST';
export const GET_RE_USER_SUCCESS = 'GET_RE_USER_SUCCESS';
export const GET_RE_USER_ERROR = 'GET_RE_USER_ERROR';