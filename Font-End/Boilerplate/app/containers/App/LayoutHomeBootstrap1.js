import { withStyles } from '@material-ui/core';
import HomeBootstrap from 'components/Dashboard/HomeBootstrap/HomeBootstrap1';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getReUserByRequest } from './actions';
import { makeSelectUser } from './selectors';
import styles from './styles';

const LayoutHomeBootstrap = ({
  component: Component,
  onLoadUser,
  user,
  ...rest
}) => {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  useEffect(() => {
    if (user && user.id) {
      onLoadUser(user.id);
    }
  }, [user]);
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
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
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
