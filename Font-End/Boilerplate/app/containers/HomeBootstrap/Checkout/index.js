import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CartTable from '../Cart/CartTable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectCart,
  makeSelectLoading,
  makeSelectUser,
  makeSelectError,
  makeSelectIsAuthenticated,
  makeSelectCities,
  makeSelectWards,
  makeSelectDistricts,
} from '../../App/selectors';
import axios from 'axios';
import { loginRequest, getReUserByRequest } from '../../App/actions';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  getApiCitiesRequest,
  getApiDistrictsRequest,
  getApiWardsRequest,
  checkOutOrderRequest,
} from './actions';
import { Link } from 'react-router-dom';
import './checkout.css';
import { showLoading, hideLoading } from '../../../components/Loading/actions';
import {
  formatNumber,
  calculartor,
  totalAmount,
  formatter,
  toalAmountAndPrice,
} from 'utils/helper';

CheckOut.propTypes = {};

function CheckOut(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { carts, user, checkoutOrder } = props;

  const [profile, setProfile] = useState();

  const [address, setAddress] = useState({
    cities: null,
    districts: null,
    wards: null,
  });
  const [label, setLabel] = useState({
    name: '',
    phone: '',
    cities: '',
    districts: '',
    wards: '',
    village: '',
    note: '',
  });

  console.log(user);
  const {
    cities,
    districts,
    wards,
    onLoad,
    onLoadDistricts,
    onLoadWards,
  } = props;

  useEffect(() => {
    setProfile(user);
    onLoad();
  }, [user]);
  useEffect(() => {
    if (address.cities !== null) {
      show();
      onLoadDistricts(address.cities);
      setTimeout(() => {
        hide();
      }, 1000);
    }
  }, [address.cities]);
  useEffect(() => {
    if (address.districts) {
      show();
      onLoadWards(address.districts);
      setTimeout(() => {
        hide();
      }, 1000);
    }
  }, [address.districts]);

  const onChangeOrder = e => {
    var name = e.target.name;
    var value = e.target.value;
    setProfile({ ...profile, [name]: value });
  };

  const ongChangeAddress = e => {
    var index = e.nativeEvent.target.selectedIndex;
    var name = e.target.name;
    var value = e.target.value;
    var text = e.nativeEvent.target[index].text;
    setLabel({ ...label, [name]: text });
    setAddress({ ...address, [name]: value });
  };
  const onChangeTextInformation = e => {
    var name = e.target.name;
    var value = e.target.value;
    setLabel({ ...label, [name]: value });
  };
  //console.log(profile);
  // dang nhap
  const { Login, isAuthenticated, err } = props;
  const [login, setLogin] = useState({ username: '', password: '' });

  const onChangeLogin = e => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmitLogin = e => {
    e.preventDefault();
    //console.log(login)
    Login(login);
  };

  const [disabled, setDisabled] = useState(false);

  const [checked, setChecked] = useState(false);
  const { show, hide } = props;
  const [price, setPrice] = useState(0);
  const [errors] = useState('Bạn không đủ điểm tích lũy để sử dụng.');
  const renderOnChangePoints = () => {
    let xhtml = null;

    if (checked) {
      show();
      setTimeout(() => {
        hide();
      }, 1000);
      //delay(2000);
      xhtml = (
        <div>
          <p className="ff-arial">Đổi điểm tích lũy 1điểm tích lũy = 1000đ</p>
          <span>
            Hiện tại bạn đang có:{' '}
            {user
              ? user.accumulatedPoints
                ? user.accumulatedPoints - price
                : 0
              : ''}{' '}
            điểm tích lũy
          </span>

          <div>
            <span>Sử dụng</span>
            <input
              type="number"
              name="price"
              value={price}
              className="accumukatedPoints__input_number"
              onChange={e => onChangePoints(e)}
            />
          </div>
        </div>
      );
    }
    return xhtml;
  };

  const onChangePoints = e => {
    e.preventDefault();
    var value = e.target.value;
    var name = e.target.name;
    if (checked) {
      if (value <= user.accumulatedPoints) {
        setPrice(value);
      }
    }
    //setPrice(0);
  };

  const onClickCheckOut = e => {
    if (disabled) {
      return;
    }

    if (
      label.cities &&
      label.districts &&
      label.wards &&
      label.village &&
      label.name &&
      label.phone
    ) {
      var accumulatedPoints = parseInt(price, 10);
      var amount = toalAmountAndPrice(carts, accumulatedPoints);

      checkoutOrder(carts, label, amount, profile, accumulatedPoints);

      setDisabled(true);
    } else {
      alert('Yêu cầu nhập đầy đủ thông tin');
    }
  };
  return (
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li>
              <Link to="/dashboard">Trang chủ</Link>
            </li>
            <li className="active color-white">Đặt hàng</li>
          </ol>
        </div>

        <div className="register-req">
          <p className="ff-arial fs-22">Yêu cầu nhập đầy đủ thông tin</p>
        </div>

        <div className="shopper-informations">
          <div className="row">
            {!isAuthenticated ? (
              <div className="col-sm-3">
                <div className="shopper-info">
                  <p>Thông tin đăng nhập</p>
                  <form onSubmit={handleSubmitLogin}>
                    <input
                      type="text"
                      name="username"
                      onChange={onChangeLogin}
                      placeholder="User Name"
                    />
                    <input
                      type="password"
                      name="password"
                      onChange={onChangeLogin}
                      placeholder="Password"
                    />
                    <button type="submit" className="btn btn-primary">
                      Đăng nhập
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className="col-sm-5 clearfix">
              <div className="bill-to">
                <p>Thông tin khách hàng</p>
                <div className="form-one">
                  <form>
                    <input
                      type="text"
                      name="firstName"
                      value={profile ? profile.firstName : ''}
                      onChange={onChangeOrder}
                      placeholder="Họ *"
                    />
                    <input
                      type="text"
                      name="lastName"
                      onChange={onChangeOrder}
                      value={profile ? profile.lastName : ''}
                      placeholder="Tên *"
                    />
                    <input
                      type="text"
                      name="email"
                      onChange={onChangeOrder}
                      value={profile ? profile.email : ''}
                      placeholder="Email *"
                    />
                    <input
                      type="text"
                      name="phone"
                      onChange={onChangeOrder}
                      value={profile ? profile.phone : ''}
                      placeholder="Số điện thoại *"
                    />
                    <input
                      type="text"
                      name="address"
                      onChange={onChangeOrder}
                      value={profile ? profile.address : ''}
                      placeholder="Địa chỉ"
                    />
                  </form>
                </div>
                <div className="form-two">
                  <form>
                    <input
                      type="text"
                      name="name"
                      value={label.name}
                      onChange={onChangeTextInformation}
                      placeholder="Tên người nhận"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={label.phone}
                      placeholder="Số điện thoại người nhận"
                      onChange={onChangeTextInformation}
                    />
                    <select name="cities" onChange={ongChangeAddress}>
                      <option value="null">-- Tỉnh/Thành Phố --</option>
                      {cities
                        ? cities.map((city, index) => (
                            <option key={index} value={city.ID}>
                              {city.Title}
                            </option>
                          ))
                        : ''}
                    </select>
                    <select name="districts" onChange={ongChangeAddress}>
                      <option>-- Quận/Huyện --</option>
                      {districts
                        ? districts.map((district, index) => (
                            <option key={index} value={district.ID}>
                              {district.Title}
                            </option>
                          ))
                        : ''}
                    </select>
                    <select name="wards" onChange={ongChangeAddress}>
                      <option>-- Phường/Xã --</option>
                      {wards
                        ? wards.map((ward, index) => (
                            <option key={index} value={ward.ID}>
                              {ward.Title}
                            </option>
                          ))
                        : ''}
                    </select>
                    <input
                      type="text"
                      name="village"
                      onChange={onChangeTextInformation}
                      placeholder="Địa chỉ Thôn/Cụm"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="order-message">
                <p className="ff-arial">Ghi chú</p>
                <textarea
                  name="note"
                  onChange={onChangeTextInformation}
                  placeholder="Ghi chú..."
                  rows="16"
                />
                {/* <label>
                  <input type="checkbox" /> Sử dụng điểm tích lũy
                </label> */}
              </div>
            </div>
          </div>
        </div>
        <div className="review-payment">
          <h2>Sản phẩm</h2>
        </div>

        <div className="table-responsive cart_info">
          <CartTable carts={carts} />
          {isAuthenticated ? (
            <div className="col-sm-6 pull-left">
              <label className="accumukatedPoints__label">
                <input
                  className="accumukatedPoints__checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />{' '}
                Sử dụng điểm tích lũy
              </label>
              {renderOnChangePoints()}
            </div>
          ) : (
            ''
          )}

          <div className="col-sm-6 pull-right">
            <div className="total_area">
              <ul>
                <li>
                  Tổng tiền <span>{formatter(totalAmount(carts))}</span>
                </li>
                {/* <li>
                    Eco Tax <span>$2</span>
                  </li> */}
                <li>
                  Phí vận chuyển <span>Free</span>
                </li>
                {checked ? (
                  <li>
                    Điểm tích luỹ <span>{formatNumber(price)} điểm</span>
                  </li>
                ) : (
                  ''
                )}
                <li>
                  Total
                  {checked ? (
                    <span>{formatter(toalAmountAndPrice(carts, price))}</span>
                  ) : (
                    <span>{formatter(toalAmountAndPrice(carts, 0))}</span>
                  )}
                </li>
              </ul>
              <button
                onClick={e => onClickCheckOut(e)}
                className="btn btn-default update pull-right"
                disabled={disabled}
              >
                {disabled ? 'Đang đặt hàng...' : 'Đặt hàng'}
              </button>
              {/* <a className="btn btn-default check_out" href="">
                  Check Out
                </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = createStructuredSelector({
  carts: makeSelectCart(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
  err: makeSelectError(),
  isAuthenticated: makeSelectIsAuthenticated(),
  cities: makeSelectCities(),
  districts: makeSelectDistricts(),
  wards: makeSelectWards(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(getApiCitiesRequest());
    },

    onLoadDistricts: id => {
      dispatch(getApiDistrictsRequest(id));
    },
    onLoadWards: id => {
      dispatch(getApiWardsRequest(id));
    },
    Login: data => {
      dispatch(loginRequest(data));
    },
    checkoutOrder: (carts, label, amount, profile, accumulatedPoints) => {
      dispatch(
        checkOutOrderRequest(carts, label, amount, profile, accumulatedPoints),
      );
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

export default compose(withConnect)(CheckOut);
