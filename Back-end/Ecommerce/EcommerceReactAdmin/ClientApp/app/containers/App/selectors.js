/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectChangeUsername = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.username,
  );

const makeSelectChangePassword = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.password,
  );
const makeSelectToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.token,
  );
const makeSelectALLRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.repos,
  );

const makeSelectChangeNameOfSize = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.size.name,
  );
const makeSelectSelectedRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedRepos,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectChangeUsername,
  makeSelectChangePassword,
  makeSelectToken,
  makeSelectALLRepos,
  makeSelectChangeNameOfSize,
  makeSelectSelectedRepos,
};
