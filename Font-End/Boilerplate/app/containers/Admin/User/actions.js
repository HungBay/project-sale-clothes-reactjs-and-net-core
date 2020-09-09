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
} from './contants';

export function getAllUsersByAdminRequest() {
  return {
    type: GET_ALL_USERS_BY_ADMIN_REQUEST,
  };
}
export function getAllUsersByAdminSuccess(users) {
  return {
    type: GET_ALL_USERS_BY_ADMIN_SUCCESS,
    users,
  };
}
export function getAllUsersByAdminError(error) {
  return {
    type: GET_ALL_USERS_BY_ADMIN_ERROR,
    error,
  };
}

export function getUserByAdminRequest(id) {
  return {
    type: GET_USER_BY_ADMIN_REQUEST,
    id,
  };
}
export function getUserByAdminSuccess(user) {
  return {
    type: GET_USER_BY_ADMIN_SUCCESS,
    user,
  };
}
export function getUserByAdminError(error) {
  return {
    type: GET_USER_BY_ADMIN_ERROR,
    error,
  };
}

export function updateUserByAdminRequest(data) {
  return {
    type: UPDATE_USER_BY_ADMIN_REQUEST,
    data,
  };
}
export function updateUserByAdminSuccess(user) {
  return {
    type: UPDATE_USER_BY_ADMIN_SUCCESS,
    user,
  };
}
export function updateUserByAdminError(error) {
  return {
    type: UPDATE_USER_BY_ADMIN_ERROR,
    error,
  };
}

export function getEmployeeOrderByAdminRequest(id) {
  return {
    type: GET_EMPLOYEE_ORDER_BY_ADMIN_REQUEST,
    id,
  };
}
export function getEmployeeOrderByAdminSuccess(orderEmploy) {
  return {
    type: GET_EMPLOYEE_ORDER_BY_ADMIN_SUCCESS,
    orderEmploy,
  };
}
export function getEmployeeOrderByAdminError(error) {
  return {
    type: GET_EMPLOYEE_ORDER_BY_ADMIN_ERROR,
    error,
  };
}
