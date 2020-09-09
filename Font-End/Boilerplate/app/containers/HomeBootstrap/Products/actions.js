import {
  GET_PRODUCT_BY_CATEGORY_ERROR,
  GET_PRODUCT_BY_CATEGORY_REQUEST,
  GET_PRODUCT_BY_CATEGORY_SUCCESS,
} from './constants';

export function getProductByCategoryRequest(id) {
  return {
    type: GET_PRODUCT_BY_CATEGORY_REQUEST,
    id,
  };
}
export function getProductByCategorySuccess(products) {
  return {
    type: GET_PRODUCT_BY_CATEGORY_SUCCESS,
    products,
  };
}
export function getProductByCategoryError(error) {
  return {
    type: GET_PRODUCT_BY_CATEGORY_ERROR,
    error,
  };
}
