/**
 *
 * SizePage
 *
 */

import { withStyles, Button, Box } from '@material-ui/core';
import {
  getAllProductByAdminRequest,
  searchProductAdmin,
} from 'containers/App/actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  makeSelectLoading,
  makeSelectProductByAdmin,
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
import Pagination from './components/Pagination';
import ProductsTable from './components/ProductTable';
import ProductsToolbar from './components/ProductToolbar';
import styles from './styles';

export function Product(props) {
  //useInjectReducer({ key: 'Product', reducer });
  //useInjectSaga({ key: 'Product', saga });

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
    products,
    classes,
    loading,
    keyword,
    onSearchProducts,
  } = props;

  useEffect(() => {
    onLoad();
    setTotalRecords(products.length);
  }, []);

  const onSearch = keyword => {
    onSearchProducts(keyword);
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
    datas = products.filter(product => {
      return product.name.toLowerCase().indexOf(keyword) !== -1;
    });
  }
  if (!keyword) {
    rowsPage = products.slice(startIndex, endIndex + 1);
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
          <ProductsToolbar onSearchProduct={onSearch} keyword={keyword} />
        </div>

        <div className={classes.content}>
          <ProductsTable products={rowsPage} loading={loading} />
        </div>

        <Box style={{marginTop: '5px'}}>
          <Pagination
            totalRecords={keyword ? datas.length : products.length}
            pageLimit={pageLimit || 10}
            initialPage={initialPage}
            pagesToShow={pagesToShow}
            onChangePage={onChangePage}
          />
        </Box>
      </div>
    </div>
  );
}

Product.propTypes = {
  classes: PropTypes.object,
  onLoad: PropTypes.func,
  products: PropTypes.any,
  loading: PropTypes.bool,
  keyword: PropTypes.string,
  onSearchProducts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProductByAdmin(),
  loading: makeSelectLoading(),
  keyword: makeSelectSearchProductByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(getAllProductByAdminRequest());
    },
    onSearchProducts: keyword => {
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
)(Product);
