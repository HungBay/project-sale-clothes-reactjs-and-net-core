import {
  GET_PRODUCT_T_SHIRT_REQUEST,
  GET_PRODUCT_T_SHIRT_SUCCESS,
  GET_PRODUCT_T_SHIRT_ERROR,
  GET_PRODUCT_KIDS_REQUEST,
  GET_PRODUCT_KIDS_SUCCESS,
  GET_PRODUCT_KIDS_ERROR,
} from './constants';

export function getProductTshirtRequest(id) {
  return {
    type: GET_PRODUCT_T_SHIRT_REQUEST,
    id,
  };
}
export function getProductTshirtSuccess(productTshirt) {
  return {
    type: GET_PRODUCT_T_SHIRT_SUCCESS,
    productTshirt,
  };
}
export function getProductTshirtError(error) {
  return {
    type: GET_PRODUCT_T_SHIRT_ERROR,
    error,
  };
}

export function getProductKidsRequest(id) {
  return {
    type: GET_PRODUCT_KIDS_REQUEST,
    id,
  };
}
export function getProductKidsSuccess(productKids) {
  return {
    type: GET_PRODUCT_KIDS_SUCCESS,
    productKids,
  };
}
export function getProductKidsError(error) {
  return {
    type: GET_PRODUCT_KIDS_ERROR,
    error,
  };
}
