import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getOrderByCustomerRequest } from '../actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectOrderByCustomer } from 'containers/App/selectors';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import moment from 'moment';
OrderDetail.propTypes = {};

function OrderDetail(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { match, onLoad, order } = props;

  console.log(match.params.id);

  console.log(order);
  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);

  const formatter = value => {
    value = value.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
    });
    return value;
  };
  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="/dashboard">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <div className="col-sm-6 col-sm-offset-3">
              <div className="row line">
                <div className="col-xs-2 stepText1">Khởi tạo đơn hàng</div>
                <div className="col-xs-2 stepText1">Chấp nhận đơn hàng</div>
                <div className="col-xs-2 stepText2">Đang vận chuyển</div>
                <div className="col-xs-2 stepText3">Chờ thanh toán</div>
                <div className="col-xs-2 stepText3">Thanh toán thành công</div>
                <div className="col-xs-2 stepText3">Kết thúc đơn hàng</div>
              </div>
              <div className="row">
                <div className="col-xs-2">
                  <div
                    className="step step1 active-order hover"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={moment(order.orderDate).format('HH:mm DD/MM/YYYY ')}
                  />
                </div>
                <div className="col-xs-2">
                  <div
                    className={
                      order.createDate
                        ? 'step step2 hover active-order'
                        : 'step step2'
                    }
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={
                      order.createDate
                        ? moment(order.createDate).format('HH:mm DD/MM/YYYY ')
                        : ''
                    }
                  />
                </div>
                <div className="col-xs-2">
                  <div
                    className={
                      order.shippingDate
                        ? 'step step3 hover active-order'
                        : 'step step3'
                    }
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={
                      order.shippingDate
                        ? moment(order.shippingDate).format('HH:mm DD/MM/YYYY ')
                        : ''
                    }
                  />
                </div>
                <div className="col-xs-2">
                  <div
                    className={
                      order.deliveredDate
                        ? 'step step3 active-order'
                        : 'step step3'
                    }
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={
                      order.deliveredDate
                        ? moment(order.deliveredDate).format(
                            'HH:mm DD/MM/YYYY ',
                          )
                        : ''
                    }
                  />
                </div>
                <div className="col-xs-2">
                  <div
                    className={
                      order.paidDate ? 'step step3 active-order' : 'step step3'
                    }
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={
                      order.paidDate
                        ? moment(order.paidDate).format('HH:mm DD/MM/YYYY ')
                        : ''
                    }
                  />
                </div>
                <div className="col-xs-2">
                  <div
                    className={
                      order.paidDate ? 'step step3 active-order' : 'step step3'
                    }
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={
                      order.paidDate
                        ? moment(order.paidDate).format('HH:mm DD/MM/YYYY ')
                        : ''
                    }
                  />
                </div>
              </div>
              {order ? (
                <div className="row mt-15">
                  <div className="alert alert-dark bg-ccc" role="alert">
                    <dl>
                      {order.orderDate ? (
                        <li>
                          Khởi tạo đơn hàng:{' '}
                          {moment(order.orderDate).format('HH:mm DD/MM/YYYY ')}
                        </li>
                      ) : (
                        ''
                      )}
                      {order.createDate ? (
                        <li>
                          Chập nhận đơn hàng:{' '}
                          {moment(order.createDate).format('HH:mm DD/MM/YYYY ')}
                        </li>
                      ) : (
                        ''
                      )}
                      {order.shippingDate ? (
                        <li>
                          Chờ vận chuyển :{' '}
                          {moment(order.shippingDate).format(
                            'HH:mm DD/MM/YYYY ',
                          )}
                        </li>
                      ) : (
                        ''
                      )}
                      {order.deliveredDate ? (
                        <li>
                          Chờ thanh toán:{' '}
                          {moment(order.deliverd).format('HH:mm DD/MM/YYYY ')}
                        </li>
                      ) : (
                        ''
                      )}
                      {order.paidDate ? (
                        <li>
                          Đơn hàng thành công:{' '}
                          {moment(order.paidDate).format('HH:mm DD/MM/YYYY ')}
                        </li>
                      ) : (
                        ''
                      )}
                    </dl>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-12">
                  <div className="product-title-id bg-white">
                    <span className="ff-arial p-2">
                      Đơn hàng:
                      <a href={`/order/${order.id}/view`}>#{order.id}</a>
                    </span>
                    <br />
                    <span className="ff-arial p-2">
                      Đặt ngày:
                      {moment(order.orderDate).format('DD/MM/YYYY HH:mm:ss')}
                    </span>
                    <span className="pull-right fs-18 color-orange mt-uns-15">
                      Tổng tiền:{' '}
                      {order.amount !== undefined
                        ? formatter(order.amount)
                        : ''}
                    </span>
                  </div>
                </div>
                {order
                  ? order.orderDetails
                    ? order.orderDetails.map((item, index) => (
                        <div className="col-sm-12" key={index}>
                          <div className="product-title-content bg-white">
                            <a
                              href={`/product/${item.product.id}/view`}
                              className="product-item-pic"
                            >
                              <img
                                className="img item-pic"
                                src={
                                  item
                                    ? `data:image/jpeg;base64,${
                                        item.product.image
                                      }`
                                    : ''
                                }
                                alt={item.product.name}
                              />
                            </a>
                            <span className="ml-15 ff-arial nowrap-2 wb-30 fs-22">
                              {item.product.name}
                            </span>
                            <span className="ml-15 ff-arial fs-14 text-center">
                              Số lượng: {item.quantity}{' '}

                            </span>
                            <span className="ml-15 ff-arial fs-14 text-center">
                              Tổng tiền:{' '}
                              {formatter(item.quantity * item.priceUnit)}
                            </span>
                          </div>
                        </div>
                      ))
                    : ''
                  : ''}
              </div>
            </div>
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-6">
                  <h3>Thông tin người gửi</h3>
                  {order ? (
                    order.user ? (
                      <div className="pd-15">
                        <span className="ff-arial fs-14 d-block">
                          Họ: {order.user.lastName}
                        </span>
                        <span className="ff-arial fs-14 d-block">
                          Tên: {order.user.firstName}
                        </span>
                        <span className="ff-arial fs-14 d-block">
                          Số điện thoại: {order.user.phone}
                        </span>
                        <span className="ff-arial fs-14 d-block">
                          Địa chỉ: {order.user.address}
                        </span>
                        <span className="ff-arial fs-14 d-block">
                          Địa chỉ email: {order.user.email}
                        </span>
                      </div>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}
                </div>
                <div className="col-sm-6">
                  <h3>Thông tin người nhận</h3>
                  {order ? (
                    <div className="pd-15">
                      <span className="ff-arial fs-14 d-block">
                        Họ: {order.name}
                      </span>

                      <span className="ff-arial fs-14 d-block">
                        Số điện thoại: {order.phone}
                      </span>
                      <span className="ff-arial fs-14 d-block">
                        Địa chỉ: {order.address}
                      </span>
                      <span className="ff-arial fs-14 d-block">
                        Tổng tiền thanh toán: {order.amount}
                      </span>
                      <span className="ff-arial fs-14 d-block">
                        Ghi chú: {order.note}
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  order: makeSelectOrderByCustomer(),
  // isLoading: makeSelectLoading(),
  // user: makeSelectUser(),
  // isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getOrderByCustomerRequest(id));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderDetail);
