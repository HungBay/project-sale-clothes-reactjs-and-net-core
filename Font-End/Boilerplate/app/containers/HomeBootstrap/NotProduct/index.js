import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';

NotProduct.propTypes = {};

function NotProduct(props) {
  return (
    <div className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <a
              // to={`/product/${product.id}/view`}
              href=""
              className="productselect-image"
            >
              <Skeleton className="img" variant="rect" />
            </a>

            {/* <Skeleton className="nowrap fs-18" variant="rect" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotProduct;
