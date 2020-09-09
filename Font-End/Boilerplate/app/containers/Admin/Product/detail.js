import {
  Avatar,
  Button,
  Divider,
  Grid,
  GridList,
  GridListTile,
  IconButton,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Skeleton from '@material-ui/lab/Skeleton';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getProductByAdminRequest } from '../../App/actions';
import {
  makeSelectLoading,
  makeSelectSelectProductByAdmin,
} from '../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {},
  ProfileButton: {
    marginLeft: theme.spacing(1),
  },
  CreateProduct: {
    marginLeft: theme.spacing(0),
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imageGroup: {
    cursor: 'pointer',
    heigh: '100%',
    objectFit: 'contain',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  ReviewImage: {
    width: '5vw',
  },
  media: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  imageProduct: {
    width: 300,
  },
}));

export function ProductDetail(props) {
  //useInjectReducer({ key: 'ProductDetail', reducer });
  //useInjectSaga({ key: 'ProductDetail', saga });

  const { match, product, onLoad, isLoading, history } = props;

  const classes = useStyles();
  const [ProductImage, setProductImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);

  const image = product ? `data:image/jpeg;base64,${product.image}` : '';
  const loadMore = () => {
    setVisible(visible + 5);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectProductImage = item => {
    setOpen(true);
    if (item) {
      setProductImage(item);
    }
  };

  const handleBack = () => {
    history.goBack();
  };
  return (
    <div>
      <Helmet>
        <title>Chi tiết sản phẩm</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <Grid container>
          <Grid item xs={12} md={12} className={classes.title}>
            <Typography variant="h4">Hình ảnh</Typography>
            {isLoading || product == null ? (
              <div>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  className={classes.media}
                />
              </div>
            ) : (
              <GridList className={classes.gridList} cols={2.5}>
                {product
                  ? product.productImages
                    ? product.productImages.map((item, key) => (
                        <GridListTile key={key}>
                          <img
                            src={
                              item.image
                                ? `data:image/jpeg;base64,${item.image}`
                                : ''
                            }
                            className={classes.imageGroup}
                            alt={product.name}
                            onClick={() => selectProductImage(item)}
                          />
                        </GridListTile>
                      ))
                    : ''
                  : ''}
              </GridList>
            )}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
            >
              <div className={classes.paper}>
                {ProductImage === null ? (
                  ''
                ) : (
                  <Grid>
                    <img
                      src={
                        ProductImage.image
                          ? `data:image/jpeg;base64,${ProductImage.image}`
                          : ''
                      }
                      className={classes.imageGroup}
                      alt={ProductImage.name}
                    />
                    <Typography variant="subtitle1" className="ff-arial">
                      {product.description}
                    </Typography>
                  </Grid>
                )}
              </div>
            </Modal>
            <Divider />
          </Grid>
          <Grid item xs={12} md={12} className={classes.title}>
            <Typography variant="h4">Sản phẩm</Typography>
            <Grid item xs={12} md={6}>
              {isLoading || product == null ? (
                <div>
                  <Skeleton />
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.media}
                    style={{ width: 100, height: 100 }}
                  />
                  <Skeleton animation={false} />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </div>
              ) : (
                <div>
                  <img
                    src={image}
                    alt={product ? product.name : ''}
                    className={classes.imageProduct}
                  />
                  <p>{product ? product.name : undefined}</p>
                  <p>{product ? product.unitPrice : undefined}</p>
                  <p>{product ? product.description : undefined}</p>
                  <p>{product ? product.unit : undefined}</p>
                </div>
              )}
            </Grid>
            <Divider />
          </Grid>

          <Grid item xs={12} md={12} className={classes.Title}>
            <Typography variant="h4">Màu quần áo</Typography>
          </Grid>

          <Grid item xs={12} md={12} className={classes.title}>
            <Typography variant="h4">Bình luận</Typography>
            {isLoading || product == null ? (
              <div>
                <Skeleton animation={false} />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            ) : product ? (
              product.reviews ? (
                product.reviews.slice(0, visible).map((review, key) => (
                  <div key={key}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            review
                              ? `data:image/jpeg;base64,${
                                  review.user.imageUser
                                }`
                              : ''
                          }
                        />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: 'left' }}>
                          {review ? review.user.firstName : ''}
                        </h4>
                        <Typography
                          style={{ textAlign: 'left' }}
                          variant="subtitle1"
                        >
                          {review ? review.comment : ''}
                        </Typography>
                        {review ? (
                          review.image ? (
                            <img
                              className={classes.ReviewImage}
                              src={
                                review
                                  ? `data:image/jpeg;base64,${review.image}`
                                  : ''
                              }
                              alt={review.comment}
                            />
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}

                        <p
                          style={{
                            textAlign: 'left',
                            color: 'gray',
                            fontSize: 12,
                            fontFamily: 'arial',
                          }}
                        >
                          {review
                            ? moment(review.date).format('DD/MM/YYYY H:m:s')
                            : ''}
                        </p>
                      </Grid>
                    </Grid>
                    <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
                  </div>
                ))
              ) : (
                ''
              )
            ) : (
              ''
            )}

            {product
              ? product.reviews
                ? visible < product.reviews.length && (
                    <Button
                      onClick={loadMore}
                      type="button"
                      className="load-more"
                    >
                      Load more
                    </Button>
                  )
                : ''
              : ''}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  onLoad: PropTypes.func,
  match: PropTypes.object,
  product: PropTypes.object,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  product: makeSelectSelectProductByAdmin(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: id => {
      setTimeout(() => {
        dispatch(getProductByAdminRequest(id));
      }, 3000);
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductDetail);
