/**
 *
 * SizePage
 *
 */

import { makeStyles, CardMedia } from '@material-ui/core';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProductMax } from 'containers/App/selectors';
import Slider from 'infinite-react-carousel';

export function ProductHot(props) {
  // useInjectReducer({ key: 'ProductHot', reducer });
  // useInjectSaga({ key: 'ProductHot', saga });

  const { productMax } = props;

  const calculartor = (promotionPrice, unitPrice) => {
    return unitPrice - (unitPrice * promotionPrice) / 100;
  };

  const formatter = value => {
    value = value.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
    });
    return value;
  };

  const settings = {
    autoplay: true,
    centerPadding: 40,
    dots: true,
    duration: 500,
    // shift: 30,
    //slidesToShow: 4,

  };
  return (
    <div>
      <Helmet>
        <title>Product</title>
        <meta name="description" content="Description of Product" />
      </Helmet>

      <div className="recommended_items">
        <h2 className="title text-center">Sản phẩm Hot</h2>

        <div
          id="recommended-item-carousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="item active">
              <Slider {...settings}>
                <CardMedia
                  // className={classes.slider}
                  component="img"
                  alt="Contemplative Reptile"
                  height="240"
                  image="https://123anhdep.net/wp-content/uploads/2016/03/bst-hinh-anh-phong-canh-thien-nhien-tuyet-dep-lang-man-tho-mong-hung-vi-nhat-the-gioi-1.jpeg"
                  title="Contemplative Reptile"
                />
              </Slider>
              {productMax
                ? productMax.map((product, index) => (
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <a
                              href={`/product/${product.id}/view`}
                              className="productselect-image"
                            >
                              <img
                                className="img"
                                src={
                                  product
                                    ? `data:image/jpeg;base64,${product.image}`
                                    : ''
                                }
                                alt={product.name}
                              />
                            </a>
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
                  ))
                : ''}
            </div>
            <div className="item">
              {productMax.length > 6
                ? productMax.slice(3, 6).map((product, index) => (
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <a
                              href={`/product/${product.id}/view`}
                              className="productselect-image"
                            >
                              <img
                                className="img"
                                src={
                                  product
                                    ? `data:image/jpeg;base64,${product.image}`
                                    : ''
                                }
                                alt={product.name}
                              />
                            </a>
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
                  ))
                : ''}
            </div>
          </div>
          <a
            className="left recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="prev"
          >
            <i className="fa fa-angle-left" />
          </a>
          <a
            className="right recommended-item-control"
            href="#recommended-item-carousel"
            data-slide="next"
          >
            <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
  );
}

ProductHot.propTypes = {};

const mapStateToProps = createStructuredSelector({
  productMax: makeSelectProductMax(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductHot);
