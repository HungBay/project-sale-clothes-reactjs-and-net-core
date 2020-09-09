/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR,
  CHANGE_USERNAME, CHANGE_PASSWORD, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  GET_ALL_REQUEST, GET_ALL_REQUEST_SUCCESS, GET_ALL_REQUEST_ERROR,
  CHANGE_NAME_OF_SIZE, CREATE_RECORD_OF_SIZE_ERROR, CREATE_RECORD_OF_SIZE_REQUEST, CREATE_RECORD_OF_SIZE_SUCCESS,
  SELECTED_REPOS, UPDATE_RECORD_OF_SIZE_REQUEST, UPDATE_RECORD_OF_SIZE_SUCCESS, UPDATE_RECORD_OF_SIZE_ERROR,
  DELETE_RECORD_OF_SIZE_REQUEST, DELETE_RECORD_OF_SIZE_SUCCESS, DELETE_RECORD_OF_SIZE_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

//login
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  };
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function getAllRequest() {
  return {
    type: GET_ALL_REQUEST,
  };
}

export function getAllSuccess(repos) {
  return {
    type: GET_ALL_REQUEST_SUCCESS,
    repos
  };
}

export function getAllError(error) {
  return {
    type: GET_ALL_REQUEST_ERROR,
    error
  };
}

//size
export function changeNameOfSize(name) {
  return {
    type: CHANGE_NAME_OF_SIZE,
    name
  };
}

export function createRecordOfSizeRequest() {
  return {
    type: CREATE_RECORD_OF_SIZE_REQUEST,
  };
}

export function createRecordOfSizeSuccess(newSize) {
  return {
    type: CREATE_RECORD_OF_SIZE_SUCCESS,
    newSize
  };
}

export function createRecordOfSizeError(error) {
  return {
    type: CREATE_RECORD_OF_SIZE_ERROR,
    error
  };
}

//selected repos
export function selectRepos(recorde) {
  return {
    type: SELECTED_REPOS,
    recorde
  };
}

export function updateRecordOfSizeRequest() {
  return {
    type: UPDATE_RECORD_OF_SIZE_REQUEST,
  };
}

export function updateRecordOfSizeSuccess(newSize) {
  return {
    type: UPDATE_RECORD_OF_SIZE_SUCCESS,
    newSize
  };
}

export function updateRecordOfSizeError(error) {
  return {
    type: UPDATE_RECORD_OF_SIZE_ERROR,
    error
  };
}

//delete
export function deleteRecordOfSizeRequest() {
  return {
    type: DELETE_RECORD_OF_SIZE_REQUEST,
  };
}

export function deleteRecordOfSizeSuccess() {
  return {
    type: DELETE_RECORD_OF_SIZE_SUCCESS,
    
  };
}

export function deleteRecordOfSizeError(error) {
  return {
    type: DELETE_RECORD_OF_SIZE_ERROR,
    error
  };
}
