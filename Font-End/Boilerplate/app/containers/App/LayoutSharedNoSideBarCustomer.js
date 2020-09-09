// import { Container, withStyles } from '@material-ui/core';
// import HeaderHome from 'components/Dashboard/Home/Header';
// import PropTypes from 'prop-types';
// import React from 'react';
// import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
// import { hideSideBar, showSideBar } from './actions';
// import { makeSelectShowSideBar } from './selectors';
// import styles from './styles';

// const LayoutSharedNoSideBarCustomer = ({ component: Component, ...rest }) => {
//   //const { showSideBar, hideSideBar, open, classes, name } = rest;

//   let pathName = rest.location.pathname;
//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <Container>
//           {/* <HeaderHome /> */}
//           <Component {...matchProps} />
//           {/* <Footer /> */}
//         </Container>
//       )}
//     />
//   );
// };

// LayoutSharedNoSideBarCustomer.propTypes = {
//   showSideBar: PropTypes.func,
//   hideSideBar: PropTypes.func,
// };

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

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
// export default compose(
//   withConnect,
//   withStyles(styles),
// )(LayoutSharedNoSideBarCustomer);
