import { Box, makeStyles } from '@material-ui/core';
import Pagination from 'components/Pagination';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectAllCustomersByAdmin } from '../../App/selectors';
import { getAllCustomerByAdminRequest } from './actions';
import CustomerTable from './CustomerTable';

CustomerAdmin.propTypes = {};

const useStyles = makeStyles(theme => ({
  root: {},
}));

function CustomerAdmin(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { customers, onLoad } = props;

  //console.log('customers', customers);
  const classes = useStyles();

  const [totalRecords, setTotalRecords] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pageLimit, setPageLimit] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [pagesToShow] = useState(5);
  const [initialPage] = useState(1);
  const { loading, keyword, onSearchOrders } = props;

  useEffect(() => {
    onLoad(1);
    setTotalRecords(customers.length);
  }, []);

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
    datas = customers.filter(user => {
      return (
        user.lastName.toLowerCase().indexOf(keyword) !== -1 ||
        user.firstName.toLowerCase().indexOf(keyword) !== -1
      );
    });
  }
  if (!keyword) {
    rowsPage = customers.slice(startIndex, endIndex + 1);
  } else if (keyword) {
    rowsPage = datas.slice(startIndex, endIndex + 1);
  }
  return (
    <div>
      <Helmet>
        <title>Trang quản lý nhân viên</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div className={classes.root}>
        {/* <div>
          <CustomerToolbar onSearchOrder={onSearch} keyword={keyword} />
        </div> */}

        <div className={classes.content}>
          <CustomerTable users={rowsPage} loading={loading} />
        </div>

        <Box>
          <Pagination
            totalRecords={keyword ? datas.length : customers.length}
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

const mapStateToProps = createStructuredSelector({
  customers: makeSelectAllCustomersByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: id => {
      dispatch(getAllCustomerByAdminRequest(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CustomerAdmin);
