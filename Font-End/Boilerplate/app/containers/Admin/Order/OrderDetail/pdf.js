import React from 'react';
import PropTypes from 'prop-types';
import logo from 'content/images/logo.png';
PDFOrder.propTypes = {};
import {
  formatter,
  totalAmountProducts,
  toalAmountAndPriceProducts,
} from 'utils/helper';

function PDFOrder(props) {
  const { order } = props;

  return (
    <div
      id="pdfdiv"
      className="container"
      style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
    >
      <div className="col-sm-12">
        <img src={logo} />
      </div>
      <div className="col-sm-12" style={{ marginBottom: '50px' }}>
        <div className="row">
          {order ? (
            <div className="col-sm-12">
              <h2 className="text-center">Thông tin khách hàng</h2>
              <div className="col-sm-12">
                <p className="ff-arial fs-14">Họ và tên: {order.name}</p>
                <p className="ff-arial fs-14">Địa chỉ: {order.address}</p>
                <p className="ff-arial fs-14">Số điện thoại: {order.phone}</p>
                <p className="ff-arial fs-14">Mã đơn hàng: #{order.id}</p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="col-sm-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td>Mã sản phẩm</td>
                  <td scope="col">Tên sản phẩm</td>
                  <td scope="col">Số lượng</td>
                  <td scope="col">Giá</td>
                  <td scope="col">Tổng</td>
                </tr>
              </thead>
              <tbody>
                {order
                  ? order.orderDetails.map((res, index) => (
                      <tr key={index}>
                        <td>{res.product.id}</td>
                        <td align="left">{res.product.name}</td>
                        <td align="left">{res.quantity}</td>
                        <td align="left">{formatter(res.priceUnit)}</td>
                        <td align="left">
                          {formatter(res.quantity * res.priceUnit)}
                        </td>
                      </tr>
                    ))
                  : ''}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" align="center">
                    Tổng cộng
                  </td>
                  <td>
                    {formatter(
                      totalAmountProducts(order ? order.orderDetails : 0),
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" align="center">
                    Phí vận chuyển
                  </td>
                  <td>Free</td>
                </tr>
                {order ? (
                  order.accumulatedPoints ? (
                    <tr>
                      <td colSpan="4" align="center">
                        Điểm tích lũy
                      </td>
                      <td>{order.accumulatedPoints}</td>
                    </tr>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                <tr>
                  <td colSpan="4" align="center">
                    Tổng tiền
                  </td>
                  <td>
                    {formatter(
                      toalAmountAndPriceProducts(
                        order ? order.orderDetails : 0,
                        order ? order.accumulatedPoints : 0,
                      ),
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p>Đơn hàng được xác nhận đặt</p>
        </div>
      </div>
    </div>
  );
}

export default PDFOrder;
