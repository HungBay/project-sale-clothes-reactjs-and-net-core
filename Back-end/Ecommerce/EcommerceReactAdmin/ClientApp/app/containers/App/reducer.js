/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR,
  CHANGE_PASSWORD, CHANGE_USERNAME, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  GET_ALL_REQUEST, GET_ALL_REQUEST_SUCCESS, GET_ALL_REQUEST_ERROR,
  CHANGE_NAME_OF_SIZE, CREATE_RECORD_OF_SIZE_ERROR, CREATE_RECORD_OF_SIZE_REQUEST, CREATE_RECORD_OF_SIZE_SUCCESS,
  SELECTED_REPOS, UPDATE_RECORD_OF_SIZE_REQUEST, UPDATE_RECORD_OF_SIZE_SUCCESS, UPDATE_RECORD_OF_SIZE_ERROR,
  DELETE_RECORD_OF_SIZE_REQUEST, DELETE_RECORD_OF_SIZE_SUCCESS, DELETE_RECORD_OF_SIZE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  token: false,
  username: false,
  password: false,
  repos: [],
  size : {
    name: false,
  },
  selectedRepos: {}
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        draft.username = action.username;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;
      case LOGIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case LOGIN_SUCCESS:
        draft.token = action.token;
        let tk = draft.token;
        if (tk.result == 400) {
          localStorage.setItem('login', JSON.stringify({
            login: false,
            result: 400,
          }));
        } else {
          localStorage.setItem('login', JSON.stringify({
            login: true,
            tokenLogin: tk.result.token,
            username: tk.result.username,
            name: tk.result.firstName + ' ' + tk.result.lastName
          }));
          window.location.href = "/Admin/Size";
        }
        draft.loading = false;
        break;
      case LOGIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case GET_ALL_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_ALL_REQUEST_SUCCESS:
        draft.repos = action.repos.result;
        draft.loading = false;
        break;

      case GET_ALL_REQUEST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case CHANGE_NAME_OF_SIZE:
        draft.size.name = action.name;
        break;
      case CREATE_RECORD_OF_SIZE_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case CREATE_RECORD_OF_SIZE_SUCCESS:
        debugger
        draft.repos = action.newSize;
        if (draft.repos.result === 200) {
          window.location.href = "/Admin/Size";
        }
        draft.loading = false;
        break;
      case CREATE_RECORD_OF_SIZE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      //seleted repos
      case SELECTED_REPOS:        
        draft.selectedRepos = action.recorde;
        break;

      //update size
      case UPDATE_RECORD_OF_SIZE_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case UPDATE_RECORD_OF_SIZE_SUCCESS:
        debugger
        let selectedSize = draft.repos.find(x => x.id == draft.selectedRepos.id);
        draft.selectedRepos = selectedSize;
        draft.loading = false;
        break;
      case UPDATE_RECORD_OF_SIZE_ERROR:
        draft.error = action.error;
        break;
      //delete size
      case DELETE_RECORD_OF_SIZE_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case DELETE_RECORD_OF_SIZE_SUCCESS:
        draft.loading = false;
        break;
      case DELETE_RECORD_OF_SIZE_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default appReducer;
