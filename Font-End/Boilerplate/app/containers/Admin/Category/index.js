/**
 *
 * SizePage
 *
 */

import { withStyles, Box } from '@material-ui/core';
import Loading from 'components/Loading/index';
import {
  getAllCategoryByAdminRequest,
  searchProductAdmin,
} from 'containers/App/actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  makeSelectCategoryByAdmin,
  makeSelectLoading,
} from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import styles from './styles';
import CategoryTable from './CategoryTable';
import CategoryToolbar from './CategoryToolbar';
import Pagination from 'components/Pagination';

export function Category(props) {
  // useInjectReducer({ key: 'Category', reducer });
  //useInjectSaga({ key: 'Category', saga });

  const {
    onLoad,
    categories,
    loading,
    classes,
    keyword,
    onSearchCategories,
  } = props;


  const [totalRecords, setTotalRecords] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pageLimit, setPageLimit] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [pagesToShow] = useState(5);
  const [initialPage] = useState(1);

  useEffect(() => {
    onLoad();
    setTotalRecords(categories.length);
  }, []);

  const onSearch = keyword => {
    console.log(keyword)
    onSearchCategories(keyword);
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
    datas = categories.filter(category => {
      return category.name.toLowerCase().indexOf(keyword) !== -1;
    });
  }
  if (!keyword) {
    rowsPage = categories.slice(startIndex, endIndex + 1);
  } else if (keyword) {
    rowsPage = datas.slice(startIndex, endIndex + 1);
  }

  return (
    <div>
      <Helmet>
        <title>Product</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div className={classes.root}>
        <div>
          <CategoryToolbar onSearchCategory={onSearch} keyword={keyword} />
        </div>

        <div className={classes.content}>
          <CategoryTable categories={rowsPage} loading={loading} />
        </div>

        <Box>
          <Pagination
            totalRecords={keyword ? datas.length : categories.length}
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

Category.propTypes = {
  onLoad: PropTypes.func,
  categories: PropTypes.any,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategoryByAdmin(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(getAllCategoryByAdminRequest());
    },
    onSearchCategories: keyword => {
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
  withStyles(styles),
  memo,
)(Category);
