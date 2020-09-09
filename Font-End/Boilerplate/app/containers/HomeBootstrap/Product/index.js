import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getProductByAdminRequest } from '../../App/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectSelectProductByAdmin,
  makeSelectReviewByProduct,
  makeSelectProductInvolveHome,
  makeSelectRatesByProduct,
} from '../../App/selectors';
import ProductDetail from './ProductDetail';
import ProductRecommendedItems from './ProductRecommendedItems';
import Comment from './Details';
import Review from './Review';
import {
  getReviewByProductRequest,
  getProductInvolveRequest,
  getRateByProductRequest,
  getImagesByProductRequest,
} from './actions';
import Tag from './Tag';
import RateComponenet from './Rate';

Product.propTypes = {};

function Product(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const [cart, setCart] = React.useState(1);

  const {
    onLoad,
    product,
    rates,
    match,
    reviews,
    onClickProductInvolve,
    productInvolve,
  } = props;
  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);

  //console.log('productInvolve', productInvolve);
  return (
    <div className="col-sm-9 padding-right">
      <ProductDetail product={product} rates={rates} />

      <div className="category-tab shop-details-tab">
        <div className="col-sm-12">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#reviews" data-toggle="tab">
                Bình luận{' '}
                {reviews.lenght > 0
                  ? `${reviews.lenght > 0 ? reviews.length : ''}`
                  : ''}
              </a>
            </li>
            {/* <li>
              <a href="#rate" data-toggle="tab">
                Đánh giá sản phẩm {`(${rates.length})`}
              </a>
            </li> */}
            {/* <li>
              <a href="#details" data-toggle="tab">
                Chi tiết
              </a>
            </li> */}

            <li>
              <a
                href="#tag"
                data-toggle="tab"
                onClick={() => onClickProductInvolve(product ? product : '')}
              >
                Sản phẩm liên quan
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <Comment />

          <RateComponenet rates={rates} product={product} />

          {/* {product ? (product.productCategories ? <Tag products={} />) : ''} */}
          <Tag products={productInvolve} />
          <Review reviews={reviews} />
        </div>
      </div>

      {/* <ProductRecommendedItems /> */}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  product: makeSelectSelectProductByAdmin(),
  reviews: makeSelectReviewByProduct(),
  rates: makeSelectRatesByProduct(),
  productInvolve: makeSelectProductInvolveHome(),
  // isLoading: makeSelectLoading(),
  // user: makeSelectUser(),
  // isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getProductByAdminRequest(id));
      dispatch(getReviewByProductRequest(id));
      dispatch(getRateByProductRequest(id));
      dispatch(getImagesByProductRequest(id));
    },
    onClickProductInvolve: product => {
      const { productCategories } = product;
      if (productCategories.length > 0) {
        dispatch(getProductInvolveRequest(productCategories));
      }
    },
    // addComment: data => {
    //   dispatch(addCommentByUserRequest(data));
    // },
    // addCart: product => {
    //   dispatch(addToCart({ product, quantity: 1 }));
    // },
  };
}

const FORM_NAME = 'PRODUCT_COMMENT';

const withReduxForm = reduxForm({
  form: FORM_NAME,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReduxForm,
)(Product);
