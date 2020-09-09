import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectEmployOrderByAdmin } from '../../../App/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { getEmployeeOrderByAdminRequest } from '../actions';
import moment from 'moment';


EmployOrder.propTypes = {};

function EmployOrder(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { orderEmploy: orders, match, onLoad } = props;

  console.log(orders);
  // console.log(match.params.id);
  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);
  return (
    <div>
      {' '}
      <div>
        {orders
          ? orders.map((order, index) => (
              <div className="col-sm-12" key={index}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="product-title-id bg-white">
                      <span className="ff-arial p-2">
                        Đơn hàng:
                        <a href={`/admin/order/${order.id}/detail`}>
                          #{order.id}
                        </a>
                      </span>
                      <br />
                      <span className="ff-arial p-2">
                        Đặt ngày:
                        {moment(order.orderDate).format('DD/MM/YYYY HH:mm:ss')}
                      </span>
                      <span className="pull-right">
                        <a href={`/admin/order/${order.id}/detail`}>
                          Chi tiết đơn hàng
                        </a>
                      </span>
                    </div>
                  </div>
                  {order
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
                              Số lượng: {item.quantity}
                            </span>
                            <span className="ml-15 ff-arial fs-14 text-center">
                              {item ? (
                                item.color ? (
                                  <div className="orderTable__color">
                                    <label>Màu:</label>
                                    <span>{item.color}</span>
                                  </div>
                                ) : (
                                  ''
                                )
                              ) : (
                                ''
                              )}
                              {item ? (
                                item.size ? (
                                  <div className="orderTable__size">
                                    <label>Kích thước:</label>
                                    <span>{item.size}</span>
                                  </div>
                                ) : (
                                  ''
                                )
                              ) : (
                                ''
                              )}
                            </span>
                          </div>
                        </div>
                      ))
                    : ''}
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  orderEmploy: makeSelectEmployOrderByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getEmployeeOrderByAdminRequest(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EmployOrder);
