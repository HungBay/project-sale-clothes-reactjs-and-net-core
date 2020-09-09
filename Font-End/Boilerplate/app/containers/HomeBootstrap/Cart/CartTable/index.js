import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { calculartor, formatter } from 'utils/helper';
import { removeFromCart, updateToCart } from '../../../App/actions';
import { makeSelectCart, makeSelectLoading } from '../../../App/selectors';

CartTable.propTypes = {};

function CartTable(props) {
  const { carts, removeItem, onUpdateItem } = props;
  const [quantity, setQuantity] = useState(1);
  const onUpdateQuantity = (product, quantity) => {
    if (quantity > 0 && quantity <= product.quantity) {
      setQuantity(quantity);
      onUpdateItem(product, quantity);
    }
  };
  const subTotal = (price, promotionPrice, quantity) => {
    if (promotionPrice !== 0) {
      return calculartor(price, promotionPrice) * quantity;
    }
    return price * quantity;
  };
  // const calculartor = (unitPrice, promotionPrice) => {
  //   return unitPrice - (unitPrice * promotionPrice) / 100;
  // };

  const onDelete = product => {
    removeItem(product);
  };

  // const formatter = value => {
  //   value = value.toLocaleString('vi', {
  //     style: 'currency',
  //     currency: 'VND',
  //   });
  //   return value;
  // };
  const onChangeQuantity = (e, product) => {
    var value = e.target.value;
    if (value > 0 && value <= product.quantity) {
      setQuantity(value);
    }
  };
  const onBlurQuantity = (product, value) => {
    var newQuantity = parseInt(value, 10);
    onUpdateItem(product, newQuantity);
  };
  console.log(carts);
  return (
    <table className="table table-condensed">
      <thead>
        <tr className="cart_menu">
          <td className="image">Hình ảnh</td>
          <td className="description" style={{ width: '35%' }} />
          <td className="category">Loại</td>
          <td className="price">Giá</td>
          <td className="quantity">Số lượng</td>
          <td className="total">Tổng</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {carts.map((cart, index) => (
          <tr key={index}>
            <td className="cart_product ff-arial">
              <a
                href={`/product/${cart.product.id}/view`}
                className="product-item-pic"
              >
                <img
                  className="img item-pic"
                  src={
                    cart ? `data:image/jpeg;base64,${cart.product.image}` : ''
                  }
                  width="240px"
                  alt={cart.product.name}
                />
              </a>
              {/* <img
                className="product-image-cart"
                src={cart ? `data:image/jpeg;base64,${cart.product.image}` : ''}
                alt=""
              /> */}
            </td>

            <td className="cart_description">
              <h4>
                <a
                  href={`/product/${cart.product.id}/view`}
                  className="ff-arial"
                >
                  {cart.product.name}
                </a>
              </h4>
            </td>
            <td>
              {cart ? (
                cart.data ? (
                  cart.data.color !== undefined ? (
                    <div>
                      <label>Màu:</label>
                      <span>{cart.data.color}</span>
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {cart ? (
                cart.data ? (
                  cart.data.size !== undefined ? (
                    <div>
                      <label>Kích thước:</label>
                      <span> {cart.data.size}</span>
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )
              ) : (
                ''
              )}
            </td>
            <td className="cart_price">
              <p className="ff-arial mt-15">
                {cart.product.promotionPrice !== 0
                  ? formatter(
                      calculartor(
                        cart.product.unitPrice,
                        cart.product.promotionPrice,
                      ),
                    )
                  : formatter(cart.product.unitPrice)}
              </p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a
                  className="cart_quantity_up"
                  onClick={() =>
                    onUpdateQuantity(cart.product, cart.quantity - 1)
                  }
                >
                  {' '}
                  -{' '}
                </a>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  id={index}
                  value={cart.quantity > 0 ? cart.quantity : quantity}
                  onChange={e => onChangeQuantity(e, cart.product)}
                  onBlur={e => onBlurQuantity(cart.product, quantity)}
                  size="3"
                />
                <a
                  className="cart_quantity_down"
                  onClick={() =>
                    onUpdateQuantity(cart.product, cart.quantity + 1)
                  }
                >
                  {' '}
                  +{' '}
                </a>
              </div>
            </td>
            <td className="cart_total ">
              <p className="cart_total_price ff-arial  mt-15">
                {formatter(
                  subTotal(
                    cart.product.unitPrice,
                    cart.product.promotionPrice,
                    cart.quantity,
                  ),
                )}
              </p>
            </td>
            <td className="cart_delete">
              <a
                className="cart_quantity_delete btn btn-primary"
                onClick={() => onDelete(cart.product)}
              >
                <i className="fa fa-times" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
const mapStateToProps = createStructuredSelector({
  carts: makeSelectCart(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // onLoad: () => {
    //   dispatch(getAllProductByAdminRequest());
    // },
    removeItem: product => {
      dispatch(removeFromCart(product));
    },
    onUpdateItem: (product, quantity) => {
      dispatch(updateToCart(product, quantity));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CartTable);
