// import { Container, withStyles } from '@material-ui/core';
// import Layout from 'components/Dashboard/Home';
// import React from 'react';
// import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';
// import { compose } from 'redux';
// import styles from './styles';

// const LayoutSharedHome = props => {
//   const { component: Component, ...rest } = props;

//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <Layout>
//           <Container>
//             <Component {...matchProps} />
//           </Container>
//         </Layout>
//       )}
//     />
//   );
// };

// LayoutSharedHome.propTypes = {};

// // const mapStateToProps = createStructuredSelector({
// //   //open: makeSelectShowSideBar(),
// // });

// // function mapDispatchToProps(dispatch) {
// //   return {
// //     dispatch,
// //     showSideBar: () => {
// //       dispatch(showSideBar());
// //     },
// //     hideSideBar: () => {
// //       dispatch(hideSideBar());
// //     },
// //   };
// // }

// const withConnect = connect(
//   null,
//   null,
// );
// export default compose(
//   withConnect,
//   withStyles(styles),
// )(LayoutSharedHome);
