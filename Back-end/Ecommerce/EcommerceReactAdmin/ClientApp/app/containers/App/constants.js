/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

//login
export const CHANGE_USERNAME = 'app/App/CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'app/App/CHANGE_PASSWORD';
export const LOGIN_REQUEST = 'app/App/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'app/App/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'app/App/LOGIN_ERROR';


//get all
export const GET_ALL_REQUEST = 'app/App/GET_ALL_REQUEST';
export const GET_ALL_REQUEST_SUCCESS = 'app/App/GET_ALL_REQUEST_SUCCESS';
export const GET_ALL_REQUEST_ERROR = 'app/App/GET_ALL_REQUEST_ERROR';

//create size
export const CHANGE_NAME_OF_SIZE = 'app/App/CHANGE_NAME_OF_SIZE';
export const CREATE_RECORD_OF_SIZE_REQUEST = 'app/App/CREATE_RECORD_OF_SIZE_REQUEST';
export const CREATE_RECORD_OF_SIZE_SUCCESS = 'app/App/CREATE_RECORD_OF_SIZE_SUCCESS';
export const CREATE_RECORD_OF_SIZE_ERROR = 'app/App/CREATE_RECORD_OF_SIZE_ERROR';

//update size
export const SELECTED_REPOS = 'app/App/SELECTED_REPOS';

export const UPDATE_RECORD_OF_SIZE_REQUEST = 'app/App/UPDATE_RECORD_OF_SIZE_REQUEST';
export const UPDATE_RECORD_OF_SIZE_SUCCESS = 'app/App/UPDATE_RECORD_OF_SIZE_SUCCESS';
export const UPDATE_RECORD_OF_SIZE_ERROR = 'app/App/UPDATE_RECORD_OF_SIZE_ERROR';

//delete size
export const DELETE_RECORD_OF_SIZE_REQUEST = 'app/App/DELETE_RECORD_OF_SIZE_REQUEST';
export const DELETE_RECORD_OF_SIZE_SUCCESS = 'app/App/DELETE_RECORD_OF_SIZE_SUCCESS';
export const DELETE_RECORD_OF_SIZE_ERROR = 'app/App/DELETE_RECORD_OF_SIZE_ERROR';
