/**
 *
 * SizePage
 *
 */

import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {
  makeSelectLoading,
  makeSelectSelectOrderByAdmin,
} from 'containers/App/selectors';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link as routerLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getOrderByAdminRequest } from '../../../App/actions';
import PDFOrder from './pdf';
import './OrderDetailsAdmin.css';
import {
  formatter,
  totalAmountProducts,
  toalAmountAndPriceProducts,
} from 'utils/helper';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    padding: theme.spacing(1),
  },
  title: {
    margin: 0,
    textAlign: 'left',
  },
  paper: {
    padding: theme.spacing(2),
  },
  status: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: 14,
  },
  statusOrder: {
    fontSize: 14,
  },
  product: {
    marginBottom: theme.spacing(2),
  },
  img: {
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  image: {
    maxWidth: 90,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  color: {
    fontSize: 16,
  },
  infoProduct: {
    marginLeft: theme.spacing(2),
  },
  unitPrice: {
    margin: theme.spacing(4),
  },
  price: { fontSize: 15 },
  info: {
    fontSize: 13,
  },
  totalAmount: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  none: {
    display: 'none',
  },
}));

export function OrderDetail(props) {
  // useInjectReducer({ key: 'OrderDetail', reducer });
  // useInjectSaga({ key: 'OrderDetail', saga });

  const { match, order, onLoad, isLoading, history } = props;

  const classes = useStyles();

  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);

  const handleBack = () => {
    history.goBack();
  };
  // const totalAmount = products => {
  //   var total = 0;
  //   if (products.length > 0) {
  //     for (let i = 0; i < products.length; i++) {
  //       total += products[i].priceUnit * products[i].quantity;
  //     }
  //   }
  //   return total;
  // };

  // const formatter = value => {
  //   value = value.toLocaleString('vi', {
  //     style: 'currency',
  //     currency: 'VND',
  //   });
  //   return value;
  // };
  const printDocument = id => {
    const input = document.getElementById('pdfdiv');
    html2canvas(input).then(canvas => {
      var imgWidth = 200;
      var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      var heightLeft = imgHeight;
      console.log(imgHeight);
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      pdf.save(`${id}.pdf`);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Chi tiết sản phẩm</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div>
        <div className={classes.contentHeader}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Typography variant="h5" className={classes.title}>
                      Chi tiết đơn hàng
                    </Typography>
                    <Typography variant="h5" className={classes.statusOrder}>
                      <BeenhereIcon fontSize="small" />
                      {order
                        ? order.statusOrder === 0
                          ? `Đã được khởi tạo vào lúc ${moment(
                              order.orderDate,
                            ).format('DD/MM/YYYY HH:mm:ss')}`
                          : order.statusOrder === 1
                          ? 'SHIPPING'
                          : order.statusOrder === 2
                          ? 'DELIVERED'
                          : order.statusOrder === 3
                          ? 'PAID'
                          : ''
                        : ''}
                    </Typography>
                  </Grid>
                  <Typography className={classes.status}>
                    {order ? (
                      order.statusOrder !== 3 ? (
                        <ReceiptIcon fontSize="small" />
                      ) : (
                        <BeenhereIcon fontSize="small" />
                      )
                    ) : (
                      ''
                    )}
                    {order
                      ? order.statusOrder !== 3
                        ? 'Chưa hoàn thành'
                        : 'Hoàn thành'
                      : ''}
                  </Typography>
                  <Divider />
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  {order
                    ? order.orderDetails.map((item, index) => (
                        <div className="orderDetailAdmin__item">
                          <div className="orderDetailAdmin__item_img">
                            <Box className={classes.img}>
                              <img
                                src={
                                  item.product.image
                                    ? `data:image/jpeg;base64,${
                                        item.product.image
                                      }`
                                    : ''
                                }
                                alt={item.product.name}
                                className="orderDetailAdmin__item_pic"
                              />
                            </Box>
                          </div>
                          <div className="orderDetailAdmin__item_content">
                            <a href="#">{item.product.name}</a>
                          </div>
                          <span className="orderDetailAdmin__item_price_category">
                            <span>Màu: {item.color}</span>
                            <br />
                            <span>Kích thước: {item.size}</span>
                          </span>
                          <div className="orderDetailAdmin__item_price">
                            <span className="orderDetailAdmin__item_price_quantity">
                              {formatter(item.priceUnit)} {'x'} {item.quantity}{' '}
                              {'='} {formatter(item.priceUnit * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))
                    : ''}
                </Grid>
              </Grid>
              <Divider />
              <div className="orderDetailAdmin_item_bottom">
                Ghi chú:{' '}
                <p className="orderDetailAdmin_item_note ff-arial fs-14" />
                <div className="orderDetailAdmin_item_total_price">
                  <span className="orderDetailAdmin_item_total_price_span ff-arial fs-14">
                    <span>Tổng số tiên sản phẩm:</span>
                    <span>
                      {formatter(
                        totalAmountProducts(order ? order.orderDetails : 0),
                      )}{' '}
                    </span>
                  </span>
                  <span className="orderDetailAdmin_item_total_price_span ff-arial fs-14">
                    <span>Phí vấn chuyển:</span>
                    <span>Free</span>
                  </span>
                  <span className="orderDetailAdmin_item_total_price_span ff-arial fs-14">
                    <span>Điểm tích lũy:</span>
                    <span>{order ? order.accumulatedPoints : ''}</span>
                  </span>
                  <span className="orderDetailAdmin_item_total_price_span ff-arial fs-14">
                    <span>Số tiền thanh toán:</span>
                    <span>
                      {formatter(
                        toalAmountAndPriceProducts(
                          order ? order.orderDetails : 0,
                          order ? order.accumulatedPoints : 0,
                        ),
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Typography variant="h5" className={classes.title}>
                      Khách hàng
                    </Typography>
                    <Typography variant="h5" className={classes.statusOrder}>
                      <Avatar
                        src={`data:image/jpeg;base64,${
                          order ? order.user.imageUser : ''
                        }`}
                        alt={order ? order.user.firtName : ''}
                      />
                    </Typography>
                  </Grid>
                  <p />
                  {/* <Typography className={classes.status}>
                  {order ? (
                    order.statusOrder !== 3 ? (
                      <ReceiptIcon fontSize="small" />
                    ) : (
                      <BeenhereIcon fontSize="small" />
                    )
                  ) : (
                    ''
                  )}
                  {order
                    ? order.statusOrder !== 3
                      ? 'Chưa hoàn thành'
                      : 'Hoàn thành'
                    : ''}
                </Typography> */}
                  <Divider />
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5" className={classes.title}>
                    Thông tin đơn hàng
                  </Typography>

                  <Typography className={classes.email}>
                    {order ? order.user.email : ''}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    style={{ marginBottom: '16px', marginTop: '16px' }}
                  >
                    Địa chỉ giao hàng
                  </Typography>

                  <Typography className={classes.info}>
                    Họ và tên:{' '}
                    {`${order ? order.user.lastName : ''} ${' '} ${
                      order ? order.user.firstName : ''
                    }`}{' '}
                  </Typography>
                  <Typography className={classes.info}>
                    Số điện thoại: {order ? order.user.phone : ''}
                  </Typography>
                  <Typography className={classes.info}>
                    Địa chỉ: {order ? order.user.address : ''}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end"
        >
          <div className={classes.row}>
            <span className={classes.spacer} />
            {/* <Button className={classes.importButton}>Import</Button> */}
            <Button
              // className={classes.exportButton}
              variant="contained"
              color="primary"
              onClick={() => printDocument(order ? order.id : '')}
            >
              PDF
            </Button>

            <Button
              // className={classes.exportButton}
              variant="contained"
              color="primary"
              style={{ marginLeft: '8px' }}
              //onClick={() => handleUpdate(order ? order.id : '')}
              to={`/admin/order-update/${order ? order.id : undefined}/upadte`}
              component={routerLink}
              disabled={
                order ? (order.statusOrder === 3 ? true : false) : false
              }
            >
              Cập nhật
            </Button>
          </div>
        </Grid>
        {/* <table id="pdfdiv">
          <th>
            <tr>
              <td>Id</td>
              <td align="right">Name</td>
              <td align="right">Age</td>
              <td align="right">Address</td>
              <td align="right">City</td>
              <td align="right">ContactNum</td>
              <td align="right">Salary</td>
              <td style={{ paddingRight: '60px' }} align="right">
                Department
              </td>
            </tr>
          </th>
        </table> */}
        <PDFOrder
          order={order}
          //formatter={formatter}
          //totalAmount={toalAmountAndPriceProducts}
        />
      </div>
    </div>
  );
}

OrderDetail.propTypes = {
  onLoad: PropTypes.func,
  match: PropTypes.object,
  order: PropTypes.object,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  order: makeSelectSelectOrderByAdmin(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: id => {
      setTimeout(() => {
        dispatch(getOrderByAdminRequest(id));
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
)(OrderDetail);
