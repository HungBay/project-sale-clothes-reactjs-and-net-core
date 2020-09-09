import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
// import HeaderAdmin from '../../components/HeaderAdmin';
// import SideBarAdmin from '../../components/SideBar';
// import { hideSideBar, showSideBar } from './actions';
// import { makeSelectShowSideBar } from './selectors';
import styles from './styles';

const DefaultLayout = ({ component: Component, ...rest }) => {
  let pathName = rest.location.pathname;
  // const LoginUser = localStorage.getItem('LoginUser');
  // const token = LoginUser ? JSON.parse(LoginUser).token : '';
  console.log(pathName);
  return (
    <Route
      {...rest}
      render={matchProps => {
        //const currentUser = token;
        //if (!currentUser) return <Component {...matchProps} />;
        //return <Redirect to={pathName} />;
        return <Component {...matchProps} />;
      }}
    />
  );
};

DefaultLayout.propTypes = {
  showSideBar: PropTypes.func,
  hideSideBar: PropTypes.func,
};

// const mapStateToProps = createStructuredSelector({
//   open: makeSelectShowSideBar(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//     showSideBar: () => {
//       dispatch(showSideBar());
//     },
//     hideSideBar: () => {
//       dispatch(hideSideBar());
//     },
//   };
// }

const withConnect = connect(
  null,
  null,
);
export default compose(
  withConnect,
  withStyles(styles),
)(DefaultLayout);
