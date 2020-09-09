import {
  GET_ALL_CUSTOMERS_BY_ADMIN_ERROR,
  GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST,
  GET_ALL_CUSTOMERS_BY_ADMIN_SUCCESS,
} from './constants';

export function getAllCustomerByAdminRequest() {
  return {
    type: GET_ALL_CUSTOMERS_BY_ADMIN_REQUEST,
  };
}
export function getAllCustomerByAdminSuccess(customers) {
  return {
    type: GET_ALL_CUSTOMERS_BY_ADMIN_SUCCESS,
    customers,
  };
}
export function getAllCustomerByAdminError(error) {
  return {
    type: GET_ALL_CUSTOMERS_BY_ADMIN_ERROR,
    error,
  };
}
