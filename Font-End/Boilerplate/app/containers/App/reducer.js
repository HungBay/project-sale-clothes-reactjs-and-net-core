/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import setAuthorization from '../../utils/setAuthorizationToken';
import {
  GET_ALL_CATEGORY_BY_ADMIN_ERROR,
  GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
  GET_ALL_CATEGORY_BY_ADMIN_SUCCESS,
  GET_ALL_COLOR_BY_ADMIN_ERROR,
  GET_ALL_COLOR_BY_ADMIN_REQUEST,
  GET_ALL_COLOR_BY_ADMIN_SUCCESS,
  GET_ALL_PRODUCT_BY_ADMIN_ERROR,
  GET_ALL_PRODUCT_BY_ADMIN_REQUEST,
  GET_ALL_PRODUCT_BY_ADMIN_SUCCESS,
  GET_ALL_PRODUCT_BY_CATEGORY_ERROR,
  GET_ALL_PRODUCT_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_ALL_PRODUCT_BY_HOME_ERROR,
  GET_ALL_PRODUCT_BY_HOME_REQUEST,
  GET_ALL_PRODUCT_BY_HOME_SUCCESS,
  GET_PRODUCT_BY_ADMIN_ERROR,
  GET_PRODUCT_BY_ADMIN_REQUEST,
  GET_PRODUCT_BY_ADMIN_SUCCESS,
  HIDE_SIDEBAR,
  LOGIN_ERROR,
  LOGIN_FACEBOOK_ERROR,
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SEARCH_PRODUCT_ADMIN,
  SET_CURRENT_TOKEN,
  SET_CURRENT_USER,
  SHOW_SIDEBAR,
  UPDATE_PRODUCT_BY_ADMIN_ERROR,
  UPDATE_PRODUCT_BY_ADMIN_REQUEST,
  UPDATE_PRODUCT_BY_ADMIN_SUCCESS,
  ADD_COMMENT_BY_USER_REQUEST,
  ADD_COMMENT_BY_USER_SUCCESS,
  ADD_COMMENT_BY_USER_ERROR,
  ADD_TO_CART,
  GET_ALL_ORDER_BY_ADMIN_REQUEST,
  GET_ALL_ORDER_BY_ADMIN_SUCCESS,
  GET_ALL_ORDER_BY_ADMIN_ERROR,
  GET_ORDER_BY_ADMIN_REQUEST,
  GET_ORDER_BY_ADMIN_SUCCESS,
  GET_ORDER_BY_ADMIN_ERROR,
  REMOVE_FROM_CART,
  CHECK_OUT_REQUEST,
  CHECK_OUT_SUCCESS,
  CHECK_OUT_ERROR,
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
  ADD_PRODUCT_BY_ADMIN_ERROR,
  ADD_PRODUCT_BY_ADMIN_SUCCESS,
  GET_ALL_SIZE_BY_ADMIN_REQUEST,
  GET_ALL_SIZE_BY_ADMIN_SUCCESS,
  GET_ALL_SIZE_BY_ADMIN_ERROR,
  GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_SUCCESS,
  GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_ERROR,
  GET_ALL_PRODUCT_NEW_REQUEST,
  GET_ALL_PRODUCT_NEW_ERROR,
  GET_ALL_PRODUCT_NEW_SUCCESS,
  UPDATE_TO_CART,
  GET_ALL_ORDER_BY_CUSTOMER_REQUEST,
  GET_ALL_ORDER_BY_CUSTOMER_SUCCESS,
  GET_ALL_ORDER_BY_CUSTOMER_ERROR,
  UPDATE_ORDER_BY_ADMIN_REQUEST,
  UPDATE_ORDER_BY_ADMIN_SUCCESS,
  UPDATE_ORDER_BY_ADMIN_ERROR,
  GET_NAVIGATION_REQUEST,
  GET_NAVIGATION_SUCCESS,
  GET_NAVIGATION_ERROR,
  GET_PRODUCT_BY_SEARCH_REQUEST,
  GET_PRODUCT_BY_SEARCH_SUCCESS,
  GET_PRODUCT_BY_SEARCH_ERROR,
  GET_RE_USER_REQUEST,
  GET_RE_USER_SUCCESS,
  GET_RE_USER_ERROR,
} from './constants';
import {
  GET_REVIEW_BY_PRODUCT_REQUEST,
  GET_REVIEW_BY_PRODUCT_SUCCESS,
  GET_REVIEW_BY_PRODUCT_ERROR,
  GET_PRODUCT_INVOLVE_REQUEST,
  GET_PRODUCT_INVOLVE_SUCCESS,
  GET_PRODUCT_INVOLVE_ERROR,
  ADD_REVIEW_BY_PRODUCT_REQUEST,
  ADD_REVIEW_BY_PRODUCT_SUCCESS,
  ADD_REVIEW_BY_PRODUCT_ERROR,
  GET_RATE_BY_PRODUCT_REQUEST,
  GET_RATE_BY_PRODUCT_SUCCESS,
  GET_RATE_BY_PRODUCT_ERROR,
  ADD_RATE_BY_PRODUCT_REQUEST,
  ADD_RATE_BY_PRODUCT_SUCCESS,
  ADD_RATE_BY_PRODUCT_ERROR,
  GET_IMAGES_BY_PRODUCT_REQUEST,
  GET_IMAGES_BY_PRODUCT_SUCCESS,
  GET_IMAGES_BY_PRODUCT_ERROR,
} from '../HomeBootstrap/Product/contants';
import {
  GET_PRODUCT_T_SHIRT_REQUEST,
  GET_PRODUCT_T_SHIRT_SUCCESS,
  GET_PRODUCT_T_SHIRT_ERROR,
  GET_PRODUCT_KIDS_REQUEST,
  GET_PRODUCT_KIDS_SUCCESS,
  GET_PRODUCT_KIDS_ERROR,
} from '../HomeBootstrap/HomePage/constants';
import {
  GET_PRODUCT_BY_CATEGORY_REQUEST,
  GET_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_PRODUCT_BY_CATEGORY_ERROR,
} from '../HomeBootstrap/Products/constants';
import {
  GET_ORDERS_BY_CUSTOMER_REQUEST,
  GET_ORDERS_BY_CUSTOMER_SUCCESS,
  GET_ORDERS_BY_CUSTOMER_ERROR,
  GET_ORDER_BY_CUSTOMER_REQUEST,
  GET_ORDER_BY_CUSTOMER_SUCCESS,
  GET_ORDER_BY_CUSTOMER_ERROR,
} from '../HomeBootstrap/Orders/contants';
import {
  GET_API_CITIES_REQUEST,
  GET_API_CITIES_SUCCESS,
  GET_API_CITIES_ERROR,
  GET_API_DISTRICTS_REQUEST,
  GET_API_DISTRICTS_SUCCESS,
  GET_API_DISTRICTS_ERROR,
  GET_API_WARDS_REQUEST,
  GET_API_WARDS_SUCCESS,
  GET_API_WARDS_ERROR,
  CHECK_OUT_ORDER_SUCCESS,
  CHECK_OUT_ORDER_ERRROR,
  CHECK_OUT_ORDER_REQUEST,
} from '../HomeBootstrap/Checkout/contants';
import {
  GET_ALL_USERS_BY_ADMIN_REQUEST,
  GET_ALL_USERS_BY_ADMIN_SUCCESS,
  GET_ALL_USERS_BY_ADMIN_ERROR,
  GET_USER_BY_ADMIN_REQUEST,
  GET_USER_BY_ADMIN_SUCCESS,
  GET_USER_BY_ADMIN_ERROR,
  UPDATE_USER_BY_ADMIN_REQUEST,
  UPDATE_USER_BY_ADMIN_SUCCESS,
  UPDATE_USER_BY_ADMIN_ERROR,
  GET_EMPLOYEE_ORDER_BY_ADMIN_REQUEST,
  GET_EMPLOYEE_ORDER_BY_ADMIN_SUCCESS,
  GET_EMPLOYEE_ORDER_BY_ADMIN_ERROR,
} from '../Admin/User/contants';
import {
  UPLOAD_IMAGE_BY_PROFILE_REQUEST,
  UPLOAD_IMAGE_BY_PROFILE_SUCCESS,
  UPLOAD_IMAGE_BY_PROFILE_ERROR,
} from '../Admin/Account/constants';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  LOGOUT_REQUEST,
} from '../Admin/Login/constants';
import {
  UPDATE_PROFILE_BY_CUSTOMER_REQUEST,
  UPDATE_PROFILE_BY_CUSTOMER_SUCCESS,
  UPDATE_PROFILE_BY_CUSTOMER_ERROR,
} from '../HomeBootstrap/Profile/constants';
import { SHOW_LOADING, HIDE_LOADING } from '../../components/Loading/constants';
import {
  GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST,
  GET_ALL_CUSTOMERS_BY_ADMIN_SUCCESS,
  GET_ALL_CUSTOMERS_BY_ADMIN_ERROR,
} from '../Admin/Customer/constants';
import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from '../Admin/Product/constants';
// The initial state of the App
var data = JSON.parse(localStorage.getItem('Cart'));

export const initialState = {
  loading: false,
  error: null,
  showSideBar: true,
  showLoading: false,
  isAuthenticated: false,
  user: {},
  currentUser: {},
  token: null,
  profile: {},
  products: [],
  carts: data ? data : [],
  orders: [],
  order: null,
  ordered: [],
  id: null,
  product: null,
  productInvolve: [],
  productNew: [],
  categories: [],
  category: {},
  sizes: [],
  colors: [],
  keyword: '',
  payload: null,
  chartDay: [],
  chartMonth: [],
  productMax: [],
  orderCustomers: [],
  home: {
    reviews: [],
    rates: [],
    images: [],
    productInvolve: [],
    productTshirt: [],
    productKids: [],
    productCategory: [],
    orders: [],
    order: {},
    address: {
      cities: [],
      districts: [],
      wards: [],
    },
    navigation: [],
  },
  admin: {
    users: [],
    user: {},
    orderEmploy: [],
    customers: [],
  },
};

const findProductInCart = (cart, product) => {
  var index = -1;
  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].product.id === product.id) {
        index = i;
        break;
      }
    }
  }
  return index;
};
const findOrder = (orders, order) => {
  var index = -1;
  if (orders.length > 0) {
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].id === order.id) {
        index = i;
        break;
      }
    }
  }
  return index;
};
const findUser = (users, user) => {
  var index = -1;
  if (users.length > 0) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].user.id === user.id) {
        index = i;
        break;
      }
    }
  }
  return index;
};
const findProduct = (products, product) => {
  var index = -1;
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        index = i;
        break;
      }
    }
  }
  return index;
};
/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    var index = -1;
    switch (action.type) {
      case SHOW_SIDEBAR:
        draft.showSideBar = true;
        break;
      case HIDE_SIDEBAR: {
        draft.showSideBar = false;
        break;
      }

      case SHOW_LOADING:
        draft.showLoading = true;
        break;
      case HIDE_LOADING:
        draft.showLoading = false;
        break;

      case GET_ALL_PRODUCT_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_ALL_PRODUCT_BY_ADMIN_SUCCESS:
        draft.products = action.products;
        draft.loading = false;
        break;

      case GET_ALL_PRODUCT_BY_ADMIN_ERROR:
        draft.loading = false;
        draft.error = action.err;
        break;
      case GET_PRODUCT_BY_ADMIN_REQUEST:
        draft.id = action.id;
        break;

      case GET_PRODUCT_BY_ADMIN_SUCCESS:
        draft.product = action.product;
        break;
      case GET_PRODUCT_BY_ADMIN_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case SEARCH_PRODUCT_ADMIN:
        draft.keyword = action.keyword;
        break;

      case UPDATE_PRODUCT_BY_ADMIN_REQUEST:
        break;
      case UPDATE_PRODUCT_BY_ADMIN_SUCCESS:
        break;
      case UPDATE_PRODUCT_BY_ADMIN_ERROR:
        draft.error = action.error;
        break;

      case GET_ALL_PRODUCT_BY_CATEGORY_REQUEST:
        draft.id = action.id;
        break;

      case GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS:
        draft.products = action.products;
        draft.loading = false;
        break;

      case GET_ALL_PRODUCT_BY_CATEGORY_ERROR:
        draft.loading = false;
        draft.error = action.err;
        break;

      case GET_ALL_PRODUCT_BY_HOME_REQUEST:
        break;

      case GET_ALL_PRODUCT_BY_HOME_SUCCESS:
        draft.products = action.products;
        draft.loading = false;
        break;

      case GET_ALL_PRODUCT_BY_HOME_ERROR:
        draft.loading = false;
        draft.error = action.err;
        break;

      case GET_ALL_CATEGORY_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_ALL_CATEGORY_BY_ADMIN_SUCCESS:
        draft.categories = action.categories;
        draft.loading = false;
        break;

      case GET_ALL_CATEGORY_BY_ADMIN_ERROR:
        draft.loading = false;
        draft.error = action.err;
        break;

      case GET_ALL_SIZE_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_ALL_SIZE_BY_ADMIN_SUCCESS:
        draft.sizes = action.sizes;
        draft.loading = false;
        break;

      case GET_ALL_SIZE_BY_ADMIN_ERROR:
        draft.loading = false;
        draft.error = action.err;
        break;

      case GET_ALL_COLOR_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_ALL_COLOR_BY_ADMIN_SUCCESS:
        draft.colors = action.colors;
        draft.loading = false;
        break;

      case GET_ALL_COLOR_BY_ADMIN_ERROR:
        draft.loading = false;
        draft.error = action.err;
        break;

      case LOGIN_REQUEST:
        break;
      case LOGIN_SUCCESS:
        draft.isAuthenticated = !isEmpty(action.user);
        draft.user = action.user;
        draft.error = '';
        localStorage.setItem('user', JSON.stringify(action.user));
        setAuthorization(draft.token);
        break;
      case LOGIN_ERROR:
        draft.error = action.error;
        draft.user = {};
        break;

      // logout
      case LOGOUT_REQUEST:
        localStorage.removeItem('user');
        draft.isAuthenticated = !isEmpty(action.user);
        draft.user = {};
        draft.home.orders = [];
        break;
      // profile
      case UPDATE_PROFILE_BY_CUSTOMER_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case UPDATE_PROFILE_BY_CUSTOMER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.user = action.user;
        break;
      case UPDATE_PROFILE_BY_CUSTOMER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      // create user
      case CREATE_USER_REQUEST:
        break;
      case CREATE_USER_SUCCESS:
        draft.isAuthenticated = !isEmpty(action.user);
        draft.user = action.user;
        draft.error = '';
        localStorage.setItem('user', JSON.stringify(action.user));
        setAuthorization(draft.token);
        break;
      case CREATE_USER_ERROR:
        draft.error = action.error;
        break;
      case SET_CURRENT_USER:
        draft.isAuthenticated = !isEmpty(action.user);
        draft.currentUser = action.user;
        break;
      case SET_CURRENT_TOKEN:
        draft.token = action.token;
        break;
      // get re-user
      case GET_RE_USER_REQUEST:
        break;
      case GET_RE_USER_SUCCESS:
        draft.user.accumulatedPoints = action.user.accumulatedPoints;
        break;
      case GET_RE_USER_ERROR:
        draft.error = action.error;
        break;
      case LOGIN_FACEBOOK_REQUEST:
        break;
      case LOGIN_FACEBOOK_SUCCESS:
        draft.isAuthenticated = !isEmpty(action.response);
        draft.profile = action.response;
        localStorage.setItem('user', JSON.stringify(action.response));
        setAuthorization(draft.profile.token);
        break;
      case LOGIN_FACEBOOK_ERROR:
        draft.error = action.error;
        break;
      case ADD_COMMENT_BY_USER_REQUEST:
        break;
      case ADD_COMMENT_BY_USER_SUCCESS:
        break;
      case ADD_COMMENT_BY_USER_ERROR:
        draft.error = action.error;
        break;

      // cart
      case ADD_TO_CART:
        index = findProductInCart(draft.carts, action.carts.product);
        if (index !== -1) {
          draft.carts[index].quantity += action.carts.quantity;
          draft.carts[index].data.color = action.carts.data.color;
          draft.carts[index].data.size = action.carts.data.size;
        } else {
          draft.carts = draft.carts.concat(action.carts);
        }
        localStorage.setItem('Cart', JSON.stringify(draft.carts));
        break;
      case UPDATE_TO_CART:
        index = findProductInCart(draft.carts, action.product);
        if (index !== -1) {
          draft.carts[index].quantity = action.quantity;
        }
        localStorage.setItem('Cart', JSON.stringify(draft.carts));
        // console.log(draft.carts);
        break;

      case REMOVE_FROM_CART:
        const { product } = action;
        index = findProductInCart(draft.carts, product);
        //console.log(index);
        if (index !== -1) {
          draft.carts.splice(index, 1);
          //console.log(draft.carts.splice(index, 1));
        }
        localStorage.setItem('Cart', JSON.stringify(draft.carts));
        break;
      // order
      case GET_ALL_ORDER_BY_ADMIN_REQUEST:
        break;
      case GET_ALL_ORDER_BY_ADMIN_SUCCESS:
        draft.loading = false;
        draft.orders = action.orders;
        break;
      case GET_ALL_ORDER_BY_ADMIN_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };

      case GET_ALL_ORDER_BY_CUSTOMER_REQUEST:
        break;
      case GET_ALL_ORDER_BY_CUSTOMER_SUCCESS:
        console.log('reducer', action.orderCustomers);
        return {
          ...state,
          loading: false,
          orderCustomers: action.orderCustomers,
        };
      case GET_ALL_ORDER_BY_CUSTOMER_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };

      case GET_ORDER_BY_ADMIN_REQUEST:
        return {
          ...state,
          id: action.id,
        };

      case GET_ORDER_BY_ADMIN_SUCCESS:
        return {
          ...state,
          order: action.order,
          loading: false,
        };

      case GET_ORDER_BY_ADMIN_ERROR:
        return {
          ...state,
          error: action.error,
          order: null,
        };

      case CHECK_OUT_REQUEST:
        return {
          ...state,
          payload: action.payload,
        };
      case CHECK_OUT_SUCCESS:
        localStorage.removeItem('Cart');
        return {
          ...state,
          ordered: action.ordered,
          loading: false,
        };
      case CHECK_OUT_ERROR:
        break;

      case DELETE_ORDER_BY_ADMIN_REQUEST:
        return {
          ...state,
        };
      case DELETE_ORDER_BY_ADMIN_SUCCESS:
        const { order } = action;
        index = findOrder(draft.orders, order);
        if (index !== -1) {
          draft.orders.splice(index, 1);
        }
        break;

      case DELETE_ORDER_BY_ADMIN_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };

      // charts
      case GET_CHART_BY_DAY_REQUST:
        break;
      case GET_CHART_BY_DAY_SUCCESS:
        return {
          ...state,
          chartDay: action.charts,
        };
      case GET_CHART_BY_DAY_ERROR:
        draft.error = action.error;
        break;
      case GET_CHART_BY_MONTH_REQUST:
        break;
      case GET_CHART_BY_MONTH_SUCCESS:
        return {
          ...state,
          chartMonth: action.charts,
        };
      case GET_CHART_BY_MONTH_ERROR:
        draft.error = action.error;
        break;

      // category
      case GET_CATEGORY_BY_ID_REQUEST:
        return {
          ...state,
          id: action.id,
          loading: true,
        };
      case GET_CATEGORY_BY_ID_SUCCESS:
        return {
          ...state,
          category: action.category,
          loading: false,
        };
      case GET_CATEGORY_BY_ID_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };

      case CREATE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_CATEGORY_SUCCESS:
        const { category } = action;
        return {
          ...state,
          loading: false,
          categories: [category].concat(state.categories),
        };
      case CREATE_CATEGORY_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };

      case UPDATE_CATEGORY_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_CATEGORY_BY_ID_SUCCESS:
        console.log('data');
        return {
          ...state,
          loading: false,
        };
      case UPDATE_CATEGORY_BY_ID_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };

      // home
      case GET_PRODUCT_BY_MAX_REQUEST:
        return {
          ...state,
        };
      case GET_PRODUCT_BY_MAX_SUCCESS:
        return {
          ...state,
          productMax: action.productMax,
          loading: false,
        };
      case GET_PRODUCT_BY_MAX_ERROR:
        return {
          ...state,
          error: action.error,
          productMax: [],
          loading: false,
        };
      // product
      case ADD_PRODUCT_BY_ADMIN_REQUEST:
        break;
      case ADD_PRODUCT_BY_ADMIN_SUCCESS:
        return {
          ...state,
          products: [action.product].concat(state.products),
          loading: false,
        };
      case ADD_PRODUCT_BY_ADMIN_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };

      case DELETE_PRODUCT_REQUEST:
        break;
      case DELETE_PRODUCT_SUCCESS:
        index = findProduct(draft.products, action.product);
        if (index !== -1) {
          draft.products.splice(index, 1);
        }
        break;

      case DELETE_PRODUCT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      // product Involve
      case GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_REQUEST:
        return {
          ...state,
        };
      case GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_SUCCESS:
        return {
          ...state,
          productInvolve: action.products,
          loading: false,
        };
      case GET_ALL_PRODUCT_INVOLVE_BY_CATEGORY_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      // product new
      case GET_ALL_PRODUCT_NEW_REQUEST:
        return {
          ...state,
        };
      case GET_ALL_PRODUCT_NEW_SUCCESS:
        return {
          ...state,
          productNew: action.products,
          loading: false,
        };
      case GET_ALL_PRODUCT_NEW_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      case UPDATE_ORDER_BY_ADMIN_REQUEST:
        return {
          ...state,
        };
      case UPDATE_ORDER_BY_ADMIN_SUCCESS:
        index = findOrder(draft.orders, action.order);
        if (index !== -1) {
          draft.orders[index] = action.order;
        } else {
          draft.orders = [action.order].concat(draft.orders);
        }
        draft.loading = false;
        break;

      case UPDATE_ORDER_BY_ADMIN_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };

      // reviews home
      case GET_REVIEW_BY_PRODUCT_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_REVIEW_BY_PRODUCT_SUCCESS:
        draft.home.reviews = action.reviews;
        draft.loading = false;
        break;

      case GET_REVIEW_BY_PRODUCT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case ADD_REVIEW_BY_PRODUCT_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case ADD_REVIEW_BY_PRODUCT_SUCCESS:
        draft.home.reviews = [action.review].concat(draft.home.reviews);
        draft.loading = false;
        draft.error = false;
        break;

      case ADD_REVIEW_BY_PRODUCT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      // rates
      case GET_RATE_BY_PRODUCT_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_RATE_BY_PRODUCT_SUCCESS:
        draft.home.rates = action.rates;
        draft.loading = false;
        draft.error = false;
        break;
      case GET_RATE_BY_PRODUCT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case ADD_RATE_BY_PRODUCT_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case ADD_RATE_BY_PRODUCT_SUCCESS:
        draft.home.rates = [action.rate].concat(draft.home.rates);
        draft.loading = false;
        draft.error = false;
        break;
      case ADD_RATE_BY_PRODUCT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      // product images
      case GET_IMAGES_BY_PRODUCT_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_IMAGES_BY_PRODUCT_SUCCESS:
        draft.home.images = action.images;
        draft.loading = false;
        draft.error = false;
        break;
      case GET_IMAGES_BY_PRODUCT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      // product involve
      case GET_PRODUCT_INVOLVE_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_PRODUCT_INVOLVE_SUCCESS:
        draft.loading = false;
        draft.home.productInvolve = action.products;
        draft.error = false;
        break;

      case GET_PRODUCT_INVOLVE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      // product tshirt
      case GET_PRODUCT_T_SHIRT_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_PRODUCT_T_SHIRT_SUCCESS:
        draft.loading = false;
        draft.home.productTshirt = action.productTshirt;

        break;

      case GET_PRODUCT_T_SHIRT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      // product kids
      case GET_PRODUCT_KIDS_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_PRODUCT_KIDS_SUCCESS:
        draft.loading = false;
        draft.home.productKids = action.productKids;

        break;

      case GET_PRODUCT_KIDS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      // product category
      case GET_PRODUCT_BY_CATEGORY_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_PRODUCT_BY_CATEGORY_SUCCESS:
        draft.loading = false;
        draft.home.productCategory = action.products;

        break;

      case GET_PRODUCT_BY_CATEGORY_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      // product search home
      case GET_PRODUCT_BY_SEARCH_REQUEST:
        draft.loading = true;
        draft.error = false;
        draft.showLoading = true;
        break;
      case GET_PRODUCT_BY_SEARCH_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.showLoading = false;
        draft.products = action.products;
        break;
      case GET_PRODUCT_BY_SEARCH_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      // order customer
      case GET_ORDERS_BY_CUSTOMER_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_ORDERS_BY_CUSTOMER_SUCCESS:
        draft.loading = false;
        draft.home.orders = action.orders;
        break;

      case GET_ORDERS_BY_CUSTOMER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case GET_ORDER_BY_CUSTOMER_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_ORDER_BY_CUSTOMER_SUCCESS:
        draft.loading = false;
        draft.home.order = action.order;
        break;

      case GET_ORDER_BY_CUSTOMER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case CHECK_OUT_ORDER_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case CHECK_OUT_ORDER_SUCCESS:
        localStorage.removeItem('Cart');
        draft.home.orders = [action.order].concat(draft.home.orders);
        draft.loading = false;
        break;
      case CHECK_OUT_ORDER_ERRROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      // get address
      case GET_API_CITIES_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_API_CITIES_SUCCESS:
        draft.loading = false;
        draft.home.address.cities = action.cities;
        break;

      case GET_API_CITIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case GET_API_DISTRICTS_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_API_DISTRICTS_SUCCESS:
        draft.loading = false;
        draft.home.address.districts = action.districts;
        break;

      case GET_API_DISTRICTS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case GET_API_WARDS_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_API_WARDS_SUCCESS:
        draft.loading = false;
        draft.home.address.wards = action.wards;
        break;

      case GET_API_WARDS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      // admin
      case GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_ALL_CUSTOMERS_BY_ADMIN_SUCCESS:
        draft.admin.customers = action.customers;
        draft.loading = false;
        break;
      case GET_ALL_CUSTOMERS_BY_ADMIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_ALL_USERS_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_ALL_USERS_BY_ADMIN_SUCCESS:
        draft.admin.users = action.users;
        draft.loading = false;
        break;
      case GET_ALL_USERS_BY_ADMIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_USER_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_USER_BY_ADMIN_SUCCESS:
        draft.admin.user = action.user;
        draft.loading = false;
        break;
      case GET_USER_BY_ADMIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      // employee order
      case GET_EMPLOYEE_ORDER_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_EMPLOYEE_ORDER_BY_ADMIN_SUCCESS:
        draft.admin.orderEmploy = action.orderEmploy;
        draft.loading = false;
        break;
      case GET_EMPLOYEE_ORDER_BY_ADMIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case UPDATE_USER_BY_ADMIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case UPDATE_USER_BY_ADMIN_SUCCESS:
        index = findUser(draft.users, action.user);
        if (index !== -1) {
          draft.users[index] = action.user;
        } else {
          draft.admin.users = [action.user].concat(draft.users);
        }
        draft.loading = false;
        break;
      case UPDATE_USER_BY_ADMIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case UPLOAD_IMAGE_BY_PROFILE_REQUEST:
        break;
      case UPLOAD_IMAGE_BY_PROFILE_SUCCESS:
        draft.user.image = action.user.imageUser;
        draft.loading = false;
        break;
      case UPLOAD_IMAGE_BY_PROFILE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      // navigation
      case GET_NAVIGATION_REQUEST:
        break;
      case GET_NAVIGATION_SUCCESS:
        draft.home.navigation = action.navigation;
        draft.loading = false;
        draft.error = false;
        break;
      case GET_NAVIGATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
