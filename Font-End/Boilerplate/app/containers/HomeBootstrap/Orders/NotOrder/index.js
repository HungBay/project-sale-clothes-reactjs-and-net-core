import React from 'react';
import PropTypes from 'prop-types';

NotOrder.propTypes = {};

function NotOrder(props) {
  return (
    <div>
      <p className="ff-arial fs-22">
        Không có đơn hàng nào! <a href="/dashboard">Quay lại trang sản phẩm</a>
      </p>
    </div>
  );
}

export default NotOrder;
