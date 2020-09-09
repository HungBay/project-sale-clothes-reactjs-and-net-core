import {
  GET_REVIEW_BY_PRODUCT_REQUEST,
  GET_REVIEW_BY_PRODUCT_SUCCESS,
  GET_REVIEW_BY_PRODUCT_ERROR,
  GET_PRODUCT_INVOLVE_REQUEST,
  GET_PRODUCT_INVOLVE_SUCCESS,
  GET_PRODUCT_INVOLVE_ERROR,
  ADD_REVIEW_BY_PRODUCT_REQUEST,
  ADD_REVIEW_BY_PRODUCT_ERROR,
  ADD_REVIEW_BY_PRODUCT_SUCCESS,
  GET_RATE_BY_PRODUCT_REQUEST,
  GET_RATE_BY_PRODUCT_SUCCESS,
  GET_RATE_BY_PRODUCT_ERROR,
  ADD_RATE_BY_PRODUCT_SUCCESS,
  ADD_RATE_BY_PRODUCT_REQUEST,
  ADD_RATE_BY_PRODUCT_ERROR,
  GET_IMAGES_BY_PRODUCT_REQUEST,
  GET_IMAGES_BY_PRODUCT_SUCCESS,
  GET_IMAGES_BY_PRODUCT_ERROR,
} from './contants';

export function getReviewByProductRequest(id) {
  return {
    type: GET_REVIEW_BY_PRODUCT_REQUEST,
    id,
  };
}
export function getReviewByProductSuccess(reviews) {
  return {
    type: GET_REVIEW_BY_PRODUCT_SUCCESS,
    reviews,
  };
}
export function getReviewByProductError(error) {
  return {
    type: GET_REVIEW_BY_PRODUCT_ERROR,
    error,
  };
}

export function getProductInvolveRequest(lstId) {
  return {
    type: GET_PRODUCT_INVOLVE_REQUEST,
    lstId,
  };
}
export function getProductInvolveSuccess(products) {
  return {
    type: GET_PRODUCT_INVOLVE_SUCCESS,
    products,
  };
}
export function getProductInvolveError(error) {
  return {
    type: GET_PRODUCT_INVOLVE_ERROR,
    error,
  };
}

export function addReviewByProductRequest(data) {
  return {
    type: ADD_REVIEW_BY_PRODUCT_REQUEST,
    data,
  };
}
export function addReviewByProductSuccess(review) {
  return {
    type: ADD_REVIEW_BY_PRODUCT_SUCCESS,
    review,
  };
}
export function addReviewByProductError(error) {
  return {
    type: ADD_REVIEW_BY_PRODUCT_ERROR,
    error,
  };
}

// rate
export function getRateByProductRequest(id) {
  return {
    type: GET_RATE_BY_PRODUCT_REQUEST,
    id,
  };
}
export function getRateByProductSuccess(rates) {
  return {
    type: GET_RATE_BY_PRODUCT_SUCCESS,
    rates,
  };
}
export function getRateByProductError(error) {
  return {
    type: GET_RATE_BY_PRODUCT_ERROR,
    error,
  };
}

export function addRateByProductRequest(rating, product, user) {
  return {
    type: ADD_RATE_BY_PRODUCT_REQUEST,
    payload: {
      rating,
      product,
      user,
    },
  };
}
export function addRateByProductSuccess(rate) {
  return {
    type: ADD_RATE_BY_PRODUCT_SUCCESS,
    rate,
  };
}
export function addRateByProductError(error) {
  return {
    type: ADD_RATE_BY_PRODUCT_ERROR,
    error,
  };
}


// product iamge
export function getImagesByProductRequest(id) {
  return {
    type: GET_IMAGES_BY_PRODUCT_REQUEST,
    id,
  };
}
export function getImagesByProductSuccess(images) {
  return {
    type: GET_IMAGES_BY_PRODUCT_SUCCESS,
    images,
  };
}
export function getImagesByProductError(error) {
  return {
    type: GET_IMAGES_BY_PRODUCT_ERROR,
    error,
  };
}
