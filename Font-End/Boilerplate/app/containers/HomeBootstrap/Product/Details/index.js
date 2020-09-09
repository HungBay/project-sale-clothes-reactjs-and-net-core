import React from 'react';
import PropTypes from 'prop-types';

Details.propTypes = {};

function Details(props) {
  return (
    <div className="tab-pane fade" id="details">
      <div className="col-sm-12">
        <div className="product-image-wrapper">
          <div className="single-products">
            <div className="productinfo text-center">
              <img src="images/home/gallery1.jpg" alt="" />
              <h2>$56</h2>
              <p>Easy Polo Black Edition</p>
              <button type="button" className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
