import React from 'react';
import PropTypes from 'prop-types';
import sale from 'images/sale.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addToCart } from '../../../App/actions';
Tshirt.propTypes = {};

function Tshirt(props) {
  const { productTshirt,addCart } = props;
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
    <div className="tab-pane fade active in" id="tshirtCategory">
      {productTshirt
        ? productTshirt.slice(0, 8).map((product, index) => (
            <div className="col-sm-3" key={index}>
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center hover">
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
                    <h2 className="price-item">
                      <span
                        className={
                          product.promotionPrice !== 0
                            ? 'line-throughs price-item price'
                            : 'price ml-15'
                        }
                      >
                        {formatter(product.unitPrice)}
                      </span>
                      <span className="price ml-15">
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
                    <button
                      className="btn btn-default add-to-cart add-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="fa fa-shopping-cart" />
                      Thêm giỏ hàng
                    </button>
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

export default compose(withConnect)(Tshirt);
