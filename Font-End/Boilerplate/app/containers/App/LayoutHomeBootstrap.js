import { withStyles } from '@material-ui/core';
import HomeBootstrap from 'components/Dashboard/HomeBootstrap';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  getProductKidsRequest,
  getProductTshirtRequest,
} from '../HomeBootstrap/HomePage/actions';
import {
  getAllProductByHomeRequest,
  getNavigationRequest,
  getProductByMaxRequest,
  getReUserByRequest,
} from './actions';
import styles from './styles';
import { createStructuredSelector } from 'reselect';
import { makeSelectProducTshirt, makeSelectProducKids, makeSelectUser } from './selectors';

const LayoutHomeBootstrap = ({
  component: Component,
  onLoad,
  onLoadCate,
  productTshirt,
  productKids,
  onLoadUser,
  user,
  ...rest
}) => {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {
    onLoadCate();
  }, []);
  useEffect(() => {
    if (user && user.id) {
      onLoadUser(user.id);
    }
  }, [user.accumulatedPoints]);
  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
          <HomeBootstrap>
            <Component {...matchProps} />
          </HomeBootstrap>
        );
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  productTshirt: makeSelectProducTshirt(),
  productKids: makeSelectProducKids(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(getAllProductByHomeRequest());
      dispatch(getProductByMaxRequest());
      dispatch(getNavigationRequest());
    },
    onLoadCate: () => {
      dispatch(getProductTshirtRequest('7cef77aa-c357-4e63-9217-08d83952b490'));
      dispatch(getProductKidsRequest('abebcf2e-95ec-4719-9224-08d83952b490'));
    },
    onLoadUser: id => {
      dispatch(getReUserByRequest(id));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withStyles(styles),
)(LayoutHomeBootstrap);
