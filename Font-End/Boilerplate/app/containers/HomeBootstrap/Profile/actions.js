import {
  UPDATE_PROFILE_BY_CUSTOMER_SUCCESS,
  UPDATE_PROFILE_BY_CUSTOMER_ERROR,
  UPDATE_PROFILE_BY_CUSTOMER_REQUEST,
} from './constants';

export function updateProfileByCustomerRequest(data) {
  return {
    type: UPDATE_PROFILE_BY_CUSTOMER_REQUEST,
    data,
  };
}
export function updateProfileByCustomerSuccess(user) {
  return {
    type: UPDATE_PROFILE_BY_CUSTOMER_SUCCESS,
    user,
  };
}
export function updateProfileByCustomerError(error) {
  return {
    type: UPDATE_PROFILE_BY_CUSTOMER_ERROR,
    error,
  };
}
