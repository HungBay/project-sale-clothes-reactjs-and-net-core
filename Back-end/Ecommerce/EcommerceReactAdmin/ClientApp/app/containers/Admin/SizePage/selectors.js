import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sizePage state domain
 */

const selectSizePageDomain = state => state.sizePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SizePage
 */

const makeSelectSizePage = () =>
  createSelector(
    selectSizePageDomain,
    substate => substate,
  );

export default makeSelectSizePage;
export { selectSizePageDomain };
