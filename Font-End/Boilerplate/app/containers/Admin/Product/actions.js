// import {
//   GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
//   GET_ALL_CATEGORY_BY_ADMIN_SUCCESS,
//   GET_ALL_CATEGORY_BY_ADMIN_ERROR,
//   GET_ALL_COLOR_BY_ADMIN_REQUEST,
//   GET_ALL_COLOR_BY_ADMIN_SUCCESS,
//   GET_ALL_COLOR_BY_ADMIN_ERROR,
//   GET_ALL_SIZE_BY_ADMIN_REQUEST,
//   GET_ALL_SIZE_BY_ADMIN_SUCCESS,
//   GET_ALL_SIZE_BY_ADMIN_ERROR,
// } from './constants';

import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from './constants';

// export function getAllCategoryByAdminRequest() {
//   return {
//     type: GET_ALL_CATEGORY_BY_ADMIN_REQUEST,
//   };
// }
// export function getAllCategoryByAdminSuccess(categories) {
//   return {
//     type: GET_ALL_CATEGORY_BY_ADMIN_SUCCESS,
//     categories,
//   };
// }
// export function getAllCategoryByAdminError(err) {
//   return {
//     type: GET_ALL_CATEGORY_BY_ADMIN_ERROR,
//     err,
//   };
// }

// // get all color by admin
// export function getAllColorByAdminRequest() {
//   return {
//     type: GET_ALL_COLOR_BY_ADMIN_REQUEST,
//   };
// }
// export function getAllColorByAdminSuccess(colors) {
//   return {
//     type: GET_ALL_COLOR_BY_ADMIN_SUCCESS,
//     colors,
//   };
// }
// export function getAllColorByAdminError(err) {
//   return {
//     type: GET_ALL_COLOR_BY_ADMIN_ERROR,
//     err,
//   };
// }
// export function getAllSizeByAdminRequest() {
//   return {
//     type: GET_ALL_SIZE_BY_ADMIN_REQUEST,
//   };
// }
// export function getAllSizeByAdminSuccess(sizes) {
//   return {
//     type: GET_ALL_SIZE_BY_ADMIN_SUCCESS,
//     sizes,
//   };
// }
// export function getAllSizeByAdminError(error) {
//   return {
//     type: GET_ALL_SIZE_BY_ADMIN_ERROR,
//     error,
//   };
// }

export function deleteProductRequest(id) {
  return {
    type: DELETE_PRODUCT_REQUEST,
    id,
  };
}
export function deleteProductSuccess(product) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    product,
  };
}
export function deleteProductError(error) {
  return {
    type: DELETE_PRODUCT_ERROR,
    error,
  };
}
