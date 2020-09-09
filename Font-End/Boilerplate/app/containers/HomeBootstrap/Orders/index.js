import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ListOrderTable from './ListOrderTable';
import { Link } from 'react-router-dom';
import ListOrderCreate from './ListOrderCreate';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getOrderByCustomerRequest,
  getOrdersByCustomerRequest,
} from './actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectOrdersByCustomer } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';
import ListOrderShipping from './ListOrderShipping';
import ListOrderDelivered from './ListOrderDelivered';
import ListOrderPaid from './ListOrderPaid';
import NotOrder from './NotOrder';

Orders.propTypes = {};

function Orders(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { onLoad, orders } = props;
  useEffect(() => {
    onLoad();
  }, []);
  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="active color-white">Đơn đặt hàng</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <div className="category-tab">
              <div className="col-sm-12 pd-0">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#orders" data-toggle="tab">
                      Tất cả
                    </a>
                  </li>
                  <li>
                    <a href="#orderCreate" data-toggle="tab">
                      Chờ giao hàng
                    </a>
                  </li>
                  <li>
                    <a href="#orderShipping" data-toggle="tab">
                      Chờ vận chuyển
                    </a>
                  </li>
                  <li>
                    <a href="#orderDelivered" data-toggle="tab">
                      Chờ thanh toán
                    </a>
                  </li>
                  <li>
                    <a href="#orderPaid" data-toggle="tab">
                      Đơn hàng thành công
                    </a>
                  </li>
                </ul>
              </div>
              {orders.length > 0 ? (
                <div className="tab-content">
                  <ListOrderTable orders={orders} />

                  <ListOrderCreate orders={orders} />

                  <ListOrderShipping orders={orders} />
                  <ListOrderDelivered orders={orders} />
                  <ListOrderPaid orders={orders} />
                </div>
              ) : (
                <NotOrder />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrdersByCustomer(),
  // isLoading: makeSelectLoading(),
  // user: makeSelectUser(),
  // isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(getOrdersByCustomerRequest());
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Orders);
