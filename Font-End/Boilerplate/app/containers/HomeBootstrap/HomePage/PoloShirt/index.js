import React from 'react';
import PropTypes from 'prop-types';

PoloShirt.propTypes = {};

function PoloShirt(props) {
  return (
    <div className="tab-pane fade" id="poloshirt">
      <div className="col-sm-3">
        <div className="product-image-wrapper">
          <div className="single-products">
            <div className="productinfo text-center">
              <img src="images/home/gallery2.jpg" alt="" />
              <h2>$56</h2>
              <p>Easy Polo Black Edition</p>
              <a href="#" className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart" />
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="product-image-wrapper">
          <div className="single-products">
            <div className="productinfo text-center">
              <img src="images/home/gallery4.jpg" alt="" />
              <h2>$56</h2>
              <p>Easy Polo Black Edition</p>
              <a href="#" className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart" />
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="product-image-wrapper">
          <div className="single-products">
            <div className="productinfo text-center">
              <img src="images/home/gallery3.jpg" alt="" />
              <h2>$56</h2>
              <p>Easy Polo Black Edition</p>
              <a href="#" className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart" />
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="product-image-wrapper">
          <div className="single-products">
            <div className="productinfo text-center">
              <img src="images/home/gallery1.jpg" alt="" />
              <h2>$56</h2>
              <p>Easy Polo Black Edition</p>
              <a href="#" className="btn btn-default add-to-cart">
                <i className="fa fa-shopping-cart" />
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoloShirt;
