import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addToCart } from '../../../App/actions';
import { Link } from 'react-router-dom';
import sale from './sale.png';

ListProduct.propTypes = {};

function ListProduct(props) {
  const { product, index, addCart } = props;
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
    <div className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <Link
              to={`/product/${product.id}/view`}
              className="productselect-image"
            >
              <img
                className="img"
                src={product ? `data:image/jpeg;base64,${product.image}` : ''}
                alt={product.name}
              />
            </Link>
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
                      calculartor(product.promotionPrice, product.unitPrice),
                    )
                  : ''}
              </span>
            </h2>
            <p className="nowrap fs-18">{product.name}</p>
            <div className="flex">
              <Link
                className="btn btn-default add-to-cart show-view"
                to={`/product/${product.id}/view`}
              >
                <i className="fa fa-crosshairs" />
                Xem
              </Link>
              <button
                className="btn btn-default add-to-cart add-cart"
                onClick={() => handleAddToCart(product)}
              >
                <i className="fa fa-shopping-cart" />
                Thêm giỏ hàng
              </button>
            </div>
          </div>
          {product.promotionPrice !== 0 ? (
            <img src={sale} className="new" alt="all" />
          ) : (
            ''
          )}
        </div>
      </div>
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

export default compose(withConnect)(ListProduct);
