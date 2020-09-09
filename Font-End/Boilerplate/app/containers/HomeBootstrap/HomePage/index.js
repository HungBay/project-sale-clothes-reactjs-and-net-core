import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DoneIcon from '@material-ui/icons/Done';
import Pagination from 'components/Pagination';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { addToCart } from '../../App/actions';
import {
  makeSelectLoading,
  makeSelectProducKids,
  makeSelectProductByAdmin,
  makeSelectProducTshirt,
  makeSelectSearchProductByAdmin,
} from '../../App/selectors';
import './index.css';
import ListProduct from './ListProduct';
import LoadProduct from './LoadProduct';
import FilterListIcon from '@material-ui/icons/FilterList';

DashboardBootstrap.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  addCart: PropTypes.func,
  keyword: PropTypes.string,
  productTshirt: PropTypes.array,
  productKids: PropTypes.array,
};

function DashboardBootstrap(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const {
    products,
    isLoading,
    addCart,
    keyword,
    productTshirt,
    productKids,
  } = props;
  const [sortData, setSortData] = useState({ by: 'name', value: 1 });
  const [anchorEl, setAnchorEl] = useState(null);

  const [totalRecords, setTotalRecords] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pageLimit, setPageLimit] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [pagesToShow] = useState(5);
  const [initialPage] = useState(1);
  useEffect(() => {
    setTotalRecords(products.length);
  }, []);

  const onChangePage = data => {
    setPageLimit(data.pageLimit);
    setTotalPages(data.totalPages);
    setCurrentPage(data.page);
    setStartIndex(data.startIndex);
    setEndIndex(data.endIndex);
  };

  // const handleAddToCart = product => {
  //   addCart(product);
  // };

  // const calculartor = (promotionPrice, unitPrice) => {
  //   var price = unitPrice - (unitPrice * promotionPrice) / 100;
  //   return price;
  // };
  // const formatter = value => {
  //   value = value.toLocaleString('vi', {
  //     style: 'currency',
  //     currency: 'VND',
  //   });
  //   return value;
  // };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSort = (sortBy, sortValue) => {
    setSortData({
      ...sortData,
      by: sortBy,
      value: sortValue,
    });
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
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <h2 className="title text-center">Danh sách sản phẩm</h2>
        <div className="col-sm-12 text-right">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            className={
              products.length > 0 || sortData.length > 0 ? '' : 'hidden'
            }
            onClick={handleClick}
          >
            Sắp xếp <FilterListIcon fontSize="small" />
          </Button>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => onSort('name', 1)}>
            Tên từ A-Z{' '}
            {sortData.by === 'name' && sortData.value === 1 ? <DoneIcon /> : ''}
          </MenuItem>
          <MenuItem onClick={() => onSort('name', -1)}>
            Tên từ Z-A
            {sortData.by === 'name' && sortData.value === -1 ? (
              <DoneIcon />
            ) : (
              ''
            )}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => onSort('unitPrice', 1)}>
            Sắp xếp tăng dần
            {sortData.by === 'unitPrice' && sortData.value === 1 ? (
              <DoneIcon />
            ) : (
              ''
            )}
          </MenuItem>
          <MenuItem onClick={() => onSort('unitPrice', -1)}>
            Sắp xếp giảm dần
            {sortData.by === 'unitPrice' && sortData.value === -1 ? (
              <DoneIcon />
            ) : (
              ''
            )}
          </MenuItem>
        </Menu>
        {products.length > 0 || sortData.length > 0 ? (
          sortData.by === 'name' ? (
            rowsPage
              .sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase())
                  return sortData.value;
                if (a.name.toLowerCase() < b.name.toLowerCase())
                  return -sortData.value;
                return 0;
              })
              .slice(0, 10)
              .map((product, index) => (
                <ListProduct product={product} Key={index} />
              ))
          ) : (
            rowsPage
              .sort((a, b) => {
                if (a.unitPrice > b.unitPrice) return sortData.value;
                if (a.unitPrice < b.unitPrice) return -sortData.value;
                return 0;
              })
              .slice(0, 10)
              .map((product, index) => (
                <ListProduct product={product} Key={index} />
              ))
          )
        ) : (
          <div>
            <LoadProduct />
            <LoadProduct />
            <LoadProduct />
            <LoadProduct />
            <LoadProduct />
            <LoadProduct />
            <LoadProduct />
            <LoadProduct />
            <LoadProduct />
          </div>
        )}
      </div>
      <Pagination
        // totalRecords={products.length}
        totalRecords={keyword ? datas.length : products.length}
        pageLimit={pageLimit || 9}
        initialPage={initialPage}
        pagesToShow={pagesToShow}
        onChangePage={onChangePage}
      />
      {/* <div className="category-tab">
        <div className="col-sm-12">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#tshirt" data-toggle="tab">
                T-Shirt
              </a>
            </li>
            <li>
              <a href="#blazers" data-toggle="tab">
                Blazers
              </a>
            </li>
            <li>
              <a href="#sunglass" data-toggle="tab">
                Sunglass
              </a>
            </li>
            <li>
              <a href="#kids" data-toggle="tab">
                Kids
              </a>
            </li>
            <li>
              <a href="#poloshirt" data-toggle="tab">
                Polo shirt
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <Tshirt productTshirt={productTshirt} />

          <div className="tab-pane fade" id="blazers">
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery4.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane fade" id="sunglass">
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery3.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery4.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery2.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Kids productKids={productKids} />

          <PoloShirt />
        </div>
      </div> */}

      {/* <ProductMax /> */}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  products: makeSelectProductByAdmin(),
  isLoading: makeSelectLoading(),
  keyword: makeSelectSearchProductByAdmin(),
  productKids: makeSelectProducKids(),
  productTshirt: makeSelectProducTshirt(),
});

function mapDispatchToProps(dispatch) {
  return {
    addCart: product => {
      dispatch(addToCart({ product, quantity: 1 }));
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
)(DashboardBootstrap);
