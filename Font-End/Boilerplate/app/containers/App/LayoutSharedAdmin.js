import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import HeaderAdmin from '../../components/HeaderAdmin';
import SideBarAdmin from '../../components/SideBar';
import { hideSideBar, showSideBar } from './actions';
import {
  makeSelectShowSideBar,
  makeSelectToken,
  makeSelectCurrentUser,
  makeSelectUser,
  makeSelectIsAuthenticated,
} from './selectors';
import styles from './styles';

const LayoutSharedAdmin = ({ component: Component, ...rest }) => {
  const {
    showSideBar,
    hideSideBar,
    open,
    classes,
    name,
    token,
    currentUser,
    user,
    isAuthenticated,
    location,
  } = rest;
  const handleToggleSideBar = value => {
    // console.log(value);
    if (value === true) {
      showSideBar();
    } else {
      hideSideBar();
    }
  };

  console.log(currentUser.role);

  return (
    <Route
      {...rest}
      render={matchProps => {
        if (!isAuthenticated) {
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }
        if (currentUser && currentUser.role !== 'Admin') {
          return <h2>Khong co quyen truy cập</h2>;
        }
        return (
          <div className={classes.root}>
            <HeaderAdmin
              name={name}
              showSideBar={open}
              onToggleSideBar={handleToggleSideBar}
            />
            <div className={classes.wapper}>
              <SideBarAdmin
                showSideBar={open}
                onToggleSideBar={handleToggleSideBar}
              />
              <div
                className={classNames(classes.wapperContent, {
                  [classes.shiftLeft]: open === false,
                })}
              >
                <Component {...matchProps} />
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        );
      }}
    />
  );
};

LayoutSharedAdmin.propTypes = {
  showSideBar: PropTypes.func,
  hideSideBar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  open: makeSelectShowSideBar(),
  token: makeSelectToken(),
  currentUser: makeSelectCurrentUser(),
  user: makeSelectUser(),
  isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showSideBar: () => {
      dispatch(showSideBar());
    },
    hideSideBar: () => {
      dispatch(hideSideBar());
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
)(LayoutSharedAdmin);
