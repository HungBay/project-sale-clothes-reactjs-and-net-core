import {
  UPLOAD_IMAGE_BY_PROFILE_REQUEST,
  UPLOAD_IMAGE_BY_PROFILE_SUCCESS,
  UPLOAD_IMAGE_BY_PROFILE_ERROR,
} from './constants';

export function uploadImageByProfileRequest(imageUser) {
  return {
    type: UPLOAD_IMAGE_BY_PROFILE_REQUEST,
    imageUser,
  };
}
export function uploadImageByProfileSuccess(user) {
  return {
    type: UPLOAD_IMAGE_BY_PROFILE_SUCCESS,
    user,
  };
}
export function uploadImageByProfileError(error) {
  return {
    type: UPLOAD_IMAGE_BY_PROFILE_ERROR,
    error,
  };
}
