import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the add state domain
 */

const selectAddDomain = state => state.add || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Add
 */

const makeSelectAdd = () =>
  createSelector(
    selectAddDomain,
    substate => substate,
  );

export default makeSelectAdd;
export { selectAddDomain };
