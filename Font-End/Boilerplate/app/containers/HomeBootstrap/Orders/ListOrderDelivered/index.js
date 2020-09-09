import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { STATUS_ORDER } from 'containers/HomeBootstrap/constants';

ListOrderDelivered.propTypes = {};

function ListOrderDelivered(props) {
  const { orders } = props;
  console.log(STATUS_ORDER);
  return (
    <div className="tab-pane fade" id="orderDelivered">
      {orders
        ? orders
            .filter(
              orderDate => orderDate.statusOrder === STATUS_ORDER.delivered,
            )
            .map((order, index) => (
              <div className="col-sm-12" key={index}>
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
                      <span className="pull-right">
                        <a href={`/order/${order.id}/view`}>
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
                          </div>
                        </div>
                      ))
                    : ''}
                </div>
              </div>
            ))
        : ''}
    </div>
  );
}

export default ListOrderDelivered;
