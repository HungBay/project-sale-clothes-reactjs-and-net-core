import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sale from 'images/sale.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addToCart } from '../../../App/actions';
Kids.propTypes = {};

function Kids(props) {
  const { productKids,addCart } = props;
  const calculartor = (promotionPrice, unitPrice) => {
    var price = unitPrice - (unitPrice * promotionPrice) / 100;
    return price;
  };
  const formatter = value => {
    value = value.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
    });
    return value;
  };
  const handleAddToCart = product => {
    addCart(product);
  };
  return (
    <div className="tab-pane fade" id="kidsCategory">
      {productKids
        ? productKids.slice(0, 6).map((product, index) => (
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <Link
                      to={`/product/${product.id}/view`}
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
                    </Link>
                    <h2 className="price-item">
                      <span
                        className={
                          product.promotionPrice !== 0
                            ? 'line-throughs price-item price-13'
                            : 'price-13 ml-15'
                        }
                      >
                        {formatter(product.unitPrice)}
                      </span>
                      <span className="price-13 ml-15">
                        {product.promotionPrice !== 0
                          ? formatter(
                              calculartor(
                                product.promotionPrice,
                                product.unitPrice,
                              ),
                            )
                          : ''}
                      </span>
                    </h2>
                    <p className="nowrap fs-18">{product.name}</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Thêm giỏ hàng
                    </a>
                  </div>
                  {product.promotionPrice !== 0 ? (
                    <img src={sale} className="new" alt="all" />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ))
        : ''}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addCart: product => {
      dispatch(addToCart({ product, quantity: 1 }));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Kids);

