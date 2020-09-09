import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { addToCart } from '../../../App/actions';
import {
  makeSelectIsAuthenticated,
  makeSelectUser,
} from '../../../App/selectors';
import { addRateByProductRequest } from '../actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import ProductImage from '../ProductImage';
import './productDetails.css';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [quantity, setQuantity] = useState(1);

  const { product, addCart, rates, addRate, isAuthenticated } = props;

  console.log(product);
  useEffect(() => {
    setValue(matchRate(rates));
  }, [rates]);
  const matchRate = rates => {
    if (rates) {
      var match_rate = 0;
      for (let i = 0; i < rates.length; i++) {
        match_rate += rates[i].rating;
      }
      match_rate = Math.ceil(match_rate / rates.length);
      return match_rate;
    }
    return 0;
  };

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

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddrate = newValue => {
    setOpen(true);
    setValue(newValue);
    renderRate();
  };

  const handleAddToRate = rating => {
    const { user, product } = props;
    if (user && product) {
      addRate(rating, product, user);
      setOpen(false);
    } else {
      alert('Yêu cầu đăng nhập để tiếp tục');
      setOpen(false);
    }
  };
  const renderRate = () => {
    let xhtml = null;

    xhtml = (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p id="alert-dialog-title" className="ff-arial fs-22 pd-15">
          Đánh giá sản phẩm
        </p>
        <DialogContent>
          <p id="alert-dialog-description" className="ff-arial fs-18">
            Bạn muốn đánh giá sản phẩm này: {value} *
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            className="ff-arial fs-14"
            onClick={() => handleAddToRate(value)}
            color="primary"
          >
            Đồng ý
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    );
    return xhtml;
  };

  const [data, setData] = useState({
    color: product
      ? product.productColors.length > 0
        ? product.productColors[0].color.name
        : ''
      : '',
    size: product
      ? product.productSizes.length > 0
        ? product.productSizes[0].size.name
        : ''
      : '',
  });
  const onChangeProduct = e => {
    var index = e.nativeEvent.target.selectedIndex;
    var name = e.target.name;
    var text = e.nativeEvent.target[index].text;
    setData({ ...data, [name]: text });
  };

  const [errors, setErrors] = useState({ quantity: '' });
  const [disabled, setDisabled] = useState(false);
  const onChangeQuantity = e => {
    var value = e.target.value;
    var name = e.target.name;
    setQuantity(value);

    if (value > product.quantity) {
      setDisabled(true);
      setErrors({
        ...errors,
        quantity: `Không nhập quá sản phẩm ${product.quantity}`,
      });
    } else if (value <= 0 || value === null) {
      setDisabled(true);
      setErrors({ ...errors, quantity: 'Nhập số sản phẩm > 0' });
    } else {
      console.log(2);
      setDisabled(false);
      setErrors({ ...errors, quantity: '' });
    }
  };
  //console.log(disabled);
  const handleAddToCart = product => {
    var cart = parseInt(quantity, 10);
    addCart(product, cart, data);
  };

  const [imageMain, setImageMain] = useState(null);
  const handleOnClickImage = item => {
    setImageMain(item);
  };
  return (
    <div className="product-details">
      {renderRate()}
      <div className="col-sm-5">
        <div className="view-product">
          <img
            src={
              imageMain === null
                ? product
                  ? `data:image/jpeg;base64,${product.image}`
                  : ''
                : `data:image/jpeg;base64,${imageMain.image}`
            }
            alt={product ? product.name : ''}
          />
        </div>
        <div
          id="similar-product"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <ProductImage
              product={product}
              handleOnClickImage={handleOnClickImage}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-7">
        <div className="product-infomation-view">
          <img
            src="images/product-details/new.jpg"
            className="newarrival"
            alt=""
          />
          <h2>{product ? product.name : ''}</h2>

          <Rating
            name="hover-feedback"
            //name="disabled"
            value={value}
            disabled={!isAuthenticated}
            onChange={(event, newValue) => {
              handleAddrate(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          <br />

          <span>
            <span
              className={
                product
                  ? product.promotionPrice !== 0
                    ? 'line-throughs price-item price'
                    : 'price color-orange'
                  : ''
              }
            >
              {formatter(product ? product.unitPrice : 0)}
            </span>{' '}
            <span className="price ml-15 color-orange">
              {product
                ? product.promotionPrice !== 0
                  ? formatter(
                      calculartor(product.promotionPrice, product.unitPrice),
                    )
                  : ''
                : 0}
            </span>
            {/* {product.promotionPrice ? (
              <span>{` (Giảm giá ${product.promotionPrice}%)`}</span>
            ) : (
              ''
            )} */}
          </span>

          <p className="ff-arial" style={{ marginTop: '5px' }}>
            <b>Mô tả:</b> {product ? product.description : ''}
          </p>
          <span className="productDetails__color">
            <label className="ff-arial">Màu:</label>
            <select
              name="color"
              onChange={onChangeProduct}
              className="productDetails__select__color"
            >
              {product
                ? product.productColors.map(item => (
                    <option key={item.colorId} value={item.colorId}>
                      {item.color.name}
                    </option>
                  ))
                : ''}
            </select>
          </span>
          <span className="productDetails__size">
            <label className="ff-arial">Kích thước:</label>
            <select
              name="size"
              onChange={onChangeProduct}
              className="productDetails__select__size"
            >
              {product
                ? product.productSizes.map(item => (
                    <option key={item.sizeId} value={item.sizeId}>
                      {item.size.name}
                    </option>
                  ))
                : ''}
            </select>
          </span>
          <span className="productDetails__quantity">
            <label className="ff-arial">Số lượng:</label>
            <input
              className="input-cart productDetails__input__quantity"
              type="number"
              value={quantity}
              onChange={e => onChangeQuantity(e)}
            />
          </span>
          <label className="quantity-danger">
            {errors ? errors.quantity : ''}
          </label>
          <p>
            <b className="ff-arial">Tình trạng:</b>{' '}
            {product ? product.quantity : 0}
          </p>
          <button
            disabled={disabled}
            onClick={() => handleAddToCart(product)}
            type="button"
            className="btn btn-fefault cart productDetails__button"
          >
            <i className="fa fa-shopping-cart" />
            Add to cart
          </button>
          {/* <p>
              <b>Condition:</b> New
            </p> */}

          <a href="">
            <img
              src="images/product-details/share.png"
              className="share img-responsive"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
}
const mapStateToProp = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  user: makeSelectUser(),
});
function mapDispatchToProps(dispatch) {
  return {
    addCart: (product, quantity, data) => {
      dispatch(addToCart({ product, quantity, data }));
    },
    addRate: (rating, product, user) => {
      dispatch(addRateByProductRequest(rating, product, user));
    },
  };
}

const withConnect = connect(
  mapStateToProp,
  mapDispatchToProps,
);

export default compose(withConnect)(ProductDetail);
