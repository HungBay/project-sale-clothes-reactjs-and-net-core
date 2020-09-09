/**
 *
 * SizePage
 *
 */

import { Box, makeStyles } from '@material-ui/core';
import Pagination from 'components/Pagination';
import {
  getAllOrderByAdminRequest,
  searchProductAdmin,
} from 'containers/App/actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  makeSelectLoading,
  makeSelectOrderByAdmin,
  makeSelectSearchProductByAdmin,
} from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import OrdersTable from './OrdersTable';
import OrdersToolBar from './OrdersToolBar';
import { makeSelectUser, makeSelectCurrentUser } from '../../App/selectors';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
}));

export function Order(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const classes = useStyles();

  const [totalRecords, setTotalRecords] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pageLimit, setPageLimit] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [pagesToShow] = useState(5);
  const [initialPage] = useState(1);
  const {
    onLoad,
    orders,
    loading,
    keyword,
    onSearchOrders,
    currentUser,
    location,
  } = props;

  //console.log(currentUser);
  useEffect(() => {
    onLoad();
    setTotalRecords(orders.length);
  }, []);

  //console.log(orders);
  const onSearch = keyword => {
    onSearchOrders(keyword);
  };

  const onChangePage = data => {
    setPageLimit(data.pageLimit);
    setTotalPages(data.totalPages);
    setCurrentPage(data.page);
    setStartIndex(data.startIndex);
    setEndIndex(data.endIndex);
  };

  let rowsPage = [];
  let datas = [];
  if (keyword) {
    datas = orders.filter(order => {
      return order.user.lastName.toLowerCase().indexOf(keyword) !== -1;
    });
  }
  if (!keyword) {
    rowsPage = orders.slice(startIndex, endIndex + 1);
  } else if (keyword) {
    rowsPage = datas.slice(startIndex, endIndex + 1);
  }
  return (
    <div>
      <Helmet>
        <title>Order</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div className={classes.root}>
        <div>
          <OrdersToolBar onSearchOrder={onSearch} keyword={keyword} />
        </div>

        <div className={classes.content}>
          <OrdersTable orders={rowsPage} loading={loading} />
        </div>

        <Box>
          <Pagination
            totalRecords={keyword ? datas.length : orders.length}
            pageLimit={pageLimit || 5}
            initialPage={initialPage}
            pagesToShow={pagesToShow}
            onChangePage={onChangePage}
          />
        </Box>
      </div>
    </div>
  );
}

Order.propTypes = {
  onLoad: PropTypes.func,
  orders: PropTypes.any,
  loading: PropTypes.bool,
  keyword: PropTypes.string,
  onSearchOrders: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrderByAdmin(),
  loading: makeSelectLoading(),
  keyword: makeSelectSearchProductByAdmin(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(getAllOrderByAdminRequest());
    },
    onSearchOrders: keyword => {
      dispatch(searchProductAdmin(keyword));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Order);
