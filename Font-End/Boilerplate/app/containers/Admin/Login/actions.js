import {
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  LOGOUT_REQUEST,
} from './constants';

export function createUserRequest(data) {
  return {
    type: CREATE_USER_REQUEST,
    data,
  };
}
export function createUserSuccess(user) {
  return {
    type: CREATE_USER_SUCCESS,
    user,
  };
}
export function createUserError(error) {
  return {
    type: CREATE_USER_ERROR,
    error,
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}
