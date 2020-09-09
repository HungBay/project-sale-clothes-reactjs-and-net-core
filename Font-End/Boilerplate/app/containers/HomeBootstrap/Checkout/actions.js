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
  CHECK_OUT_ORDER_REQUEST,
  CHECK_OUT_ORDER_SUCCESS,
  CHECK_OUT_ORDER_ERRROR,
} from './contants';
export function getApiCitiesRequest() {
  return {
    type: GET_API_CITIES_REQUEST,
  };
}
export function getApiCitiesSuccess(cities) {
  return {
    type: GET_API_CITIES_SUCCESS,
    cities,
  };
}
export function getApiCitiesError(error) {
  return {
    type: GET_API_CITIES_ERROR,
    error,
  };
}
export function getApiDistrictsRequest(id) {
  return {
    type: GET_API_DISTRICTS_REQUEST,
    id,
  };
}
export function getApiDistrictsSuccess(districts) {
  return {
    type: GET_API_DISTRICTS_SUCCESS,
    districts,
  };
}
export function getApiDistrictsError(error) {
  return {
    type: GET_API_DISTRICTS_ERROR,
    error,
  };
}
export function getApiWardsRequest(id) {
  return {
    type: GET_API_WARDS_REQUEST,
    id,
  };
}
export function getApiWardsSuccess(wards) {
  return {
    type: GET_API_WARDS_SUCCESS,
    wards,
  };
}
export function getApiWardsError(error) {
  return {
    type: GET_API_WARDS_ERROR,
    error,
  };
}

export function checkOutOrderRequest(
  carts,
  address,
  amount,
  profile,
  accumulatedPoints,
) {
  return {
    type: CHECK_OUT_ORDER_REQUEST,
    payload: { carts, address, amount, profile, accumulatedPoints },
  };
}
export function checkOutOrderSuccess(order) {
  return {
    type: CHECK_OUT_ORDER_SUCCESS,
    order,
  };
}
export function checkOutOrderError(error) {
  return {
    type: CHECK_OUT_ORDER_ERRROR,
    error,
  };
}
