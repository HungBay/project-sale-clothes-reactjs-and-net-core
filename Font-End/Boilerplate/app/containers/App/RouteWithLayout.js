import { Typography } from '@material-ui/core';
import Layout from 'components/Dashboard/Admin';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Link as RouterLink, Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  makeSelectCurrentUser,
  makeSelectIsAuthenticated,
  makeSelectUser,
} from './selectors';
import {
  getAllOrderByAdminRequest,
  getChartByMonthRequest,
  getChartByDayRequest,
  getAllCategoryByAdminRequest,
  getAllColorByAdminRequest,
  getAllSizeByAdminRequest,
} from './actions';

const RouteWithLayout = props => {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const {
    component: Component,
    isAuthenticated,
    currentUser,
    location,

    ...rest
  } = props;
  return (
    <Route
      {...rest}
      render={matchProps => {
        if (!isAuthenticated) {
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }
        if (currentUser && currentUser.role === 'Customer') {
          return (
            <div>
              <h2>Không có quyền truy cập</h2>
              <Typography color="textSecondary" variant="body1">
                Quay lại trang mua sắm?{' '}
                <Link component={RouterLink} to="/home" variant="h6">
                  Trang mua sắm
                </Link>
              </Typography>
            </div>
          );
        }
        return (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        );
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
  path: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  currentUser: PropTypes.object,
  user: PropTypes.object,
  location: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  user: makeSelectUser(),
  isAuthenticated: makeSelectIsAuthenticated(),
});
// function mapDispatchToProps(dispatch) {
//   return {
//     onLoad: () => {
//       //dispatch(getAllOrderByAdminRequest());
//       //dispatch(getChartByDayRequest());
//       //dispatch(getChartByMonthRequest());
//       // dispatch(getAllCategoryByAdminRequest());
//       // dispatch(getAllColorByAdminRequest());
//       // dispatch(getAllSizeByAdminRequest());
//     },
//   };
// }

const withConnect = connect(
  mapStateToProps,
  null,
);
export default compose(withConnect)(RouteWithLayout);
