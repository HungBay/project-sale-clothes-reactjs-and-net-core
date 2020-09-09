import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DoneIcon from '@material-ui/icons/Done';
import Pagination from 'components/Pagination';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { addToCart, getProductByMaxRequest } from '../../App/actions';
import {
  makeSelectLoading,
  makeSelectProducKids,
  makeSelectProductByAdmin,
  makeSelectProducTshirt,
  makeSelectSearchProductByAdmin,
  makeSelectProductByCategory,
} from '../../App/selectors';
import {
  getProductByCategoryRequest,
  getProductKidsRequest,
  getProductTshirtRequest,
} from './actions';
import './index.css';
import Kids from './Kids';
import ListProduct from './ListProduct';
import PoloShirt from './PoloShirt';
import Tshirt from './Tshirt';
import NotProduct from '../NotProduct';
DashboardBootstrap.propTypes = {};
import FilterListIcon from '@material-ui/icons/FilterList';
import { showLoading, hideLoading } from '../../../components/Loading/actions';

function DashboardBootstrap(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const {
    onLoad,
    products,
    isLoading,
    keyword,
    addCart,
    productTshirt,
    productKids,
    match,
    show,
    hide,
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
    onLoad(match.params.id);
    setTotalRecords(products.length);
  }, [match.params.id || products.length]);

  const onChangePage = data => {
    setPageLimit(data.pageLimit);
    setTotalPages(data.totalPages);
    setCurrentPage(data.page);
    setStartIndex(data.startIndex);
    setEndIndex(data.endIndex);
  };

  const handleAddToCart = product => {
    addCart(product);
  };

  // const handleChange = e => {};
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
        {sortData.by === 'name'
          ? rowsPage
              .sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase())
                  return sortData.value;
                if (a.name.toLowerCase() < b.name.toLowerCase())
                  return -sortData.value;
                return 0;
              })
              .slice(0, 10)
              .map((product, index) => (
                <ListProduct product={product} index={index} />
              ))
          : rowsPage
              .sort((a, b) => {
                if (a.unitPrice > b.unitPrice) return sortData.value;
                if (a.unitPrice < b.unitPrice) return -sortData.value;
                return 0;
              })
              .slice(0, 10)
              .map((product, index) => (
                <ListProduct product={product} index={index} />
              ))}
        {rowsPage.length <= 0 ? (
          <>
            <NotProduct />
            <NotProduct />
            <NotProduct />
            <NotProduct />
            <NotProduct />
            <NotProduct />
          </>
        ) : (
          ''
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
      <div className="category-tab">
        <div className="col-sm-12">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#tshirtCategory" data-toggle="tab">
                Áo thun
              </a>
            </li>
            {/* <li>
              <a href="#blazers" data-toggle="tab">
                Blazers
              </a>
            </li>
            <li>
              <a href="#sunglass" data-toggle="tab">
                Sunglass
              </a>
            </li> */}
            <li>
              <a href="#kidsCategory" data-toggle="tab">
                Trẻ em
              </a>
            </li>
            {/* <li>
              <a href="#poloshirt" data-toggle="tab">
                Áo thun có cổ
              </a>
            </li> */}
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
      </div>

      {/* <div className="recommended_items">
        <h2 className="title text-center">recommended items</h2>

        <div
          id="recommended-item-carousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="item active">
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend1.jpg" alt="" />
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
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend2.jpg" alt="" />
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
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend3.jpg" alt="" />
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
            <div className="item">
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend1.jpg" alt="" />
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
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend2.jpg" alt="" />
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
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/recommend3.jpg" alt="" />
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
          </div>
          <a
            className="left recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="prev"
          >
            <i className="fa fa-angle-left" />
          </a>
          <a
            className="right recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="next"
          >
            <i className="fa fa-angle-right" />
          </a>
        </div>
      </div> */}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  products: makeSelectProductByCategory(),
  isLoading: makeSelectLoading(),
  keyword: makeSelectSearchProductByAdmin(),
  productKids: makeSelectProducKids(),
  productTshirt: makeSelectProducTshirt(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: categoryId => {
      dispatch(getProductByCategoryRequest(categoryId));
    },
    addCart: product => {
      dispatch(addToCart({ product, quantity: 1 }));
    },
    show: () => {
      dispatch(showLoading());
    },
    hide: () => {
      dispatch(hideLoading());
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
