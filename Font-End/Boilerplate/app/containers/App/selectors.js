/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectShowLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.showLoading,
  );
const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );
const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );
const makeSelectIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isAuthenticated,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );
const makeSelectShowSideBar = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.showSideBar,
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
const makeSelectProductByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.products,
  );
const makeSelectSearchProductByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.keyword,
  );
const makeSelectSelectProductByAdminId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.id,
  );
const makeSelectSelectProductByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.product,
  );
const makeSelectCategoryByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.categories,
  );
const makeSelectSizeByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.sizes,
  );
const makeSelectColorByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.colors,
  );
const makeSelectCart = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.carts,
  );
const makeSelectOrderByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.orders,
  );
const makeSelectSelectOrderByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.order,
  );
const makeSelectOrdered = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.ordered,
  );
const makeSelectPayLoad = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.payload,
  );
const makeSelectChartDay = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.chartDay,
  );
const makeSelectChartMonth = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.chartMonth,
  );
// category
const makeSelectCategoryById = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.category,
  );
// home
const makeSelectProductMax = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.productMax,
  );
// product involve
const makeSelectProductInvolve = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.productInvolve,
  );
// product new
const makeSelectProductNew = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.productNew,
  );
const makeSelectOrderCustomers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.orderCustomers,
  );
const makeSelectReviewByProduct = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.reviews,
  );
const makeSelectRatesByProduct = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.rates,
  );
const makeSelectImagesByProduct = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.images,
  );
const makeSelectProductInvolveHome = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.productInvolve,
  );
const makeSelectProducTshirt = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.productTshirt,
  );
const makeSelectProducKids = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.productKids,
  );
const makeSelectProductByCategory = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.productCategory,
  );
const makeSelectOrdersByCustomer = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.orders,
  );
const makeSelectOrderByCustomer = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.order,
  );
// address
const makeSelectCities = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.address.cities,
  );
const makeSelectDistricts = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.address.districts,
  );
const makeSelectWards = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.address.wards,
  );

// admin
const makeSelectAllCustomersByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.admin.customers,
  );
// admin
const makeSelectAllUsersByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.admin.users,
  );
const makeSelectUserByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.admin.user,
  );

const makeSelectEmployOrderByAdmin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.admin.orderEmploy,
  );
// navigation
const makeSelectNavigation = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.home.navigation,
  );
export {
  makeSelectAllCustomersByAdmin,
  makeSelectEmployOrderByAdmin,
  makeSelectImagesByProduct,
  makeSelectNavigation,
  makeSelectAllUsersByAdmin,
  makeSelectUserByAdmin,
  makeSelectCities,
  makeSelectDistricts,
  makeSelectWards,
  makeSelectOrdersByCustomer,
  makeSelectOrderByCustomer,
  makeSelectProductByCategory,
  makeSelectProducKids,
  makeSelectRatesByProduct,
  makeSelectReviewByProduct,
  makeSelectProductInvolveHome,
  makeSelectProducTshirt,
  makeSelectPayLoad,
  makeSelectProductByAdmin,
  makeSelectSearchProductByAdmin,
  makeSelectSelectProductByAdmin,
  makeSelectSelectProductByAdminId,
  makeSelectCategoryByAdmin,
  makeSelectSizeByAdmin,
  makeSelectColorByAdmin,
  makeSelectShowSideBar,
  makeSelectCart,
  makeSelectOrderByAdmin,
  makeSelectSelectOrderByAdmin,
  makeSelectOrdered,
  makeSelectChartDay,
  makeSelectChartMonth,
  makeSelectCategoryById,
  makeSelectProductMax,
  makeSelectProductInvolve,
  makeSelectProductNew,
  makeSelectOrderCustomers,
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectChangeUsername,
  makeSelectChangePassword,
  makeSelectToken,
  makeSelectUser,
  makeSelectIsAuthenticated,
  makeSelectALLRepos,
  makeSelectChangeNameOfSize,
  makeSelectSelectedRepos,
  makeSelectShowLoading,
};
