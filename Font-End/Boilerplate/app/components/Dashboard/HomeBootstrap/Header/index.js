import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as routerLink, Link } from 'react-router-dom';
import logo from 'content/images/logo.png';
import './index.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectCart,
  makeSelectIsAuthenticated,
  makeSelectNavigation,
} from '../../../../containers/App/selectors';
import { logoutRequest } from '../../../../containers/Admin/Login/actions';
import { getProductBySearchRequest } from '../../../../containers/App/actions';
Header.propTypes = {
  carts: PropTypes.array,
  isAuthorization: PropTypes.bool,
  logout: PropTypes.func,
  history: PropTypes.object,
  NAVIGATION: PropTypes.array,
  onSearchProduct: PropTypes.func,
};

function Header(props) {
  const {
    carts,
    isAuthorization,
    logout,
    history,
    NAVIGATION,
    onSearchProduct,
  } = props;
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <Link to="#">
                        <i className="fa fa-phone" /> +0349179935
                      </Link>
                    </li>
                    <li>
                      <Link to="fb.com">
                        <i className="fa fa-envelope" />{' '}
                        nguyen.hhung97@gmail.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link>
                        <i className="fa fa-facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="fa fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="fa fa-linkedin" />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="fa fa-dribbble" />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="fa fa-google-plus" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link href="/dashboard">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  {/* <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                       <Link>Canada</Link>
                      </li>
                      <li>
                       <Link>UK</Link>
                      </li>
                    </ul>
                  </div> */}

                  {/* <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link>Canadian Dollar</Link>
                      </li>
                      <li>
                        <Link>Pound</Link>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right  bg-white">
                  <ul className="nav navbar-nav">
                    {isAuthorization ? (
                      <li className="color-header">
                        <Link className="color-header" to="/profile">
                          <i className="fa fa-user" /> Tài khoản
                        </Link>
                      </li>
                    ) : (
                      ''
                    )}

                    <li className="color-header">
                      <Link className="color-header" to="/checkout">
                        <i className="fa fa-crosshairs" /> Thanh toán
                      </Link>
                    </li>
                    <li className="color-header">
                      <Link className="color-header" to="/cart">
                        <i className="fa fa-shopping-cart" /> Giỏ hàng{' '}
                        <span>({carts.length > 0 ? carts.length : 0})</span>
                      </Link>
                    </li>
                    <li className="color-header">
                      {isAuthorization ? (
                        <Link className="color-header" to="/orders">
                          <i className="fa fa-indent" /> Đơn hàng
                        </Link>
                      ) : (
                        ''
                      )}
                    </li>
                    <li className="color-header hover">
                      {isAuthorization ? (
                        <a className="color-header" onClick={() => logout()}>
                          <i className="fa fa-lock" /> Thoát
                        </a>
                      ) : (
                        <Link className="color-header" to="/login">
                          <i className="fa fa-lock" /> Đăng nhập
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only"> </span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/dashboard">Trang chủ</Link>
                    </li>
                    <li className="dropdown">
                      <Link to="#">
                        Thời trang nam
                        <i className="fa fa-angle-down" />
                      </Link>
                      <ul role="menu" className="sub-menu hover">
                        {NAVIGATION.map(nav => {
                          if (nav.slug === 'men') {
                            return nav.name.map((res, index) => (
                              <li key={index}>
                                <Link to={`/products/${res.id}/${res.slug}`}>
                                  {res.name}
                                </Link>
                              </li>
                            ));
                          }
                        })}
                      </ul>
                    </li>
                    <li className="dropdown">
                      <Link to="/">
                        Thời trang nữ
                        <i className="fa fa-angle-down" />
                      </Link>
                      <ul role="menu" className="sub-menu">
                        {NAVIGATION.map(nav => {
                          if (nav.slug === 'women') {
                            return nav.name.map((res, index) => (
                              <li key={index}>
                                <Link to={`/products/${res.id}/${res.slug}`}>
                                  {res.name}
                                </Link>
                              </li>
                            ));
                          }
                        })}
                      </ul>
                    </li>
                    <li>
                      {NAVIGATION.map(nav => {
                        if (nav.slug === 'kids') {
                          return nav.name.map((res, index) => (
                            <li key={index}>
                              <Link to={`/products/${res.id}/${res.slug}`}>
                                {res.name}
                              </Link>
                            </li>
                          ));
                        }
                      })}
                    </li>
                    <li>
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();

                        onSearchProduct(keyword);
                      }
                    }}
                    //onBlur={e => onSearchProduct(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  carts: makeSelectCart(),
  isAuthorization: makeSelectIsAuthenticated(),
  NAVIGATION: makeSelectNavigation(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logoutRequest());
    },
    onSearchProduct: keyword => {
      dispatch(getProductBySearchRequest(keyword));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
