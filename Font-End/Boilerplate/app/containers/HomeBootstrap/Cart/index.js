import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectCart } from 'containers/App/selectors';
import { removeFromCart, updateToCart } from '../../App/actions';
import CartTable from './CartTable';
import NotProduct from './../NotProduct';
import {Link} from 'react-router-dom';

Cart.propTypes = {};

function Cart(props) {
  const { carts, removeItem, onUpdateItem } = props;
  const [quantity, setQuantity] = useState(1);
  const onUpdateQuantity = (product, quantity) => {
    if (quantity > 0) {
      setQuantity(quantity);
      onUpdateItem(product, quantity);
    }
  };
  const subTotal = (price, promotionPrice, quantity) => {
    if (promotionPrice !== 0) {
      return calculartor(price, promotionPrice) * quantity;
    }
    return price * quantity;
  };
  const calculartor = (unitPrice, promotionPrice) => {
    return unitPrice - (unitPrice * promotionPrice) / 100;
  };
  const totalAmount = carts => {
    var total = 0;
    if (carts.length > 0) {
      for (let i = 0; i < carts.length; i++) {
        if (carts[i].product.promotionPrice !== 0) {
          total +=
            calculartor(
              carts[i].product.unitPrice,
              carts[i].product.promotionPrice,
            ) * carts[i].quantity;
        } else {
          total += carts[i].product.unitPrice * carts[i].quantity;
        }
      }
    }

    return total;
  };
  const onDelete = product => {
    removeItem(product);
  };

  const formatter = value => {
    value = value.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
    });
    return value;
  };
  const onChangeQuantity = e => {
    setQuantity(e.target.value);
  };
  const onBlurQuantity = (product, value) => {
    var newQuantity = new Number(value);
    onUpdateItem(product, newQuantity);
  };

  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <Link to="/dashboard">Trang chủ</Link>
              </li>
              <li className="active color-white">Giỏ hàng</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            {carts.length > 0 ? <CartTable carts={carts} /> : <NotProduct />}
          </div>
        </div>
      </section>

      {carts.length > 0 ? (
        <section id="do_action">
          <div className="container">
            {/* <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div> */}
            <div className="row">
              {/* <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping & Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href="">
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href="">
                  Continue
                </a>
              </div>
            </div> */}
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
                    <li>
                      Total <span>{formatter(totalAmount(carts))}</span>
                    </li>
                  </ul>
                  <a className="btn btn-default update" href="/checkout">
                    Chi tiết đơn hàng
                  </a>
                  {/* <a className="btn btn-default check_out" href="">
                  Check Out
                </a> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ''
      )}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  carts: makeSelectCart(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // onLoad: () => {
    //   dispatch(getAllProductByAdminRequest());
    // },
    removeItem: product => {
      dispatch(removeFromCart(product));
    },
    onUpdateItem: (product, quantity) => {
      dispatch(updateToCart(product, quantity));
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
)(Cart);
