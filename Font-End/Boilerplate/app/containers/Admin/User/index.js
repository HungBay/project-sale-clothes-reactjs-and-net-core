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
import { makeSelectAllUsersByAdmin } from '../../App/selectors';
import { getAllUsersByAdminRequest } from './actions';
import UsersTable from './UserTable';

User.propTypes = {};

const useStyles = makeStyles(theme => ({
  root: {},
}));

function User(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { users, onLoad } = props;

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
    onLoad();
    setTotalRecords(users.length);
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
    datas = users.filter(user => {
      return (
        user.lastName.toLowerCase().indexOf(keyword) !== -1 ||
        user.firstName.toLowerCase().indexOf(keyword) !== -1
      );
    });
  }
  if (!keyword) {
    rowsPage = users.slice(startIndex, endIndex + 1);
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
            <UsersToolBar onSearchOrder={onSearch} keyword={keyword} />
          </div> */}

        <div className={classes.content}>
          <UsersTable users={rowsPage} loading={loading} />
        </div>

        <Box>
          <Pagination
            totalRecords={keyword ? datas.length : users.length}
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
  users: makeSelectAllUsersByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(getAllUsersByAdminRequest());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(User);
