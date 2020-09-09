import {
  GET_ORDERS_BY_CUSTOMER_REQUEST,
  GET_ORDERS_BY_CUSTOMER_SUCCESS,
  GET_ORDERS_BY_CUSTOMER_ERROR,
  GET_ORDER_BY_CUSTOMER_REQUEST,
  GET_ORDER_BY_CUSTOMER_SUCCESS,
  GET_ORDER_BY_CUSTOMER_ERROR,
} from './contants';

export function getOrdersByCustomerRequest() {
  return {
    type: GET_ORDERS_BY_CUSTOMER_REQUEST,
  };
}
export function getOrdersByCustomerSuccess(orders) {
  return {
    type: GET_ORDERS_BY_CUSTOMER_SUCCESS,
    orders,
  };
}
export function getOrdersByCustomerError(error) {
  return {
    type: GET_ORDERS_BY_CUSTOMER_ERROR,
    error,
  };
}

export function getOrderByCustomerRequest(id) {
  return {
    type: GET_ORDER_BY_CUSTOMER_REQUEST,
    id,
  };
}
export function getOrderByCustomerSuccess(order) {
  return {
    type: GET_ORDER_BY_CUSTOMER_SUCCESS,
    order,
  };
}
export function getOrderByCustomerError(error) {
  return {
    type: GET_ORDER_BY_CUSTOMER_ERROR,
    error,
  };
}
