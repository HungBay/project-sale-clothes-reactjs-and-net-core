import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectImagesByProduct } from '../../../App/selectors';
import './productImages.css';
import Carousel from 'react-elastic-carousel';
import { CardMedia } from '@material-ui/core';
ProductImage.propTypes = {};

function ProductImage(props) {
  const { productImages, handleOnClickImage } = props;

  const handleOnclick = (e, item) => {
    handleOnClickImage(item);
  };

  return (
    <div className="productImages__slider">
      {productImages.length > 3 ? (
        <Carousel
          className="productImages__slider__carousel"
          itemsToShow={4}
          pagination={false}
        >
          {productImages.map(item => (
            <CardMedia
              className="productImages__slider_item"
              component="img"
              alt={item.name}
              // height="60"
              image={item ? `data:image/jpeg;base64,${item.image}` : ''}
              title={item.name}
              onClick={e => handleOnclick(e, item)}
            />
          ))}
        </Carousel>
      ) : (
        ''
      )}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  productImages: makeSelectImagesByProduct(),
});

// function mapDispatchToProps(dispatch) {
//   return {};
// }

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ProductImage);
