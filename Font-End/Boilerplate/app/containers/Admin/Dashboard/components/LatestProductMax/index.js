import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  IconButton,
  CardMedia,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { Link as routerLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tablecell: {
    textDecoration: 'none',
  },
  // status: {
  //   marginRight: theme.spacing(1),
  // },
  actions: {
    justifyContent: 'flex-end',
  },
  status: {
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 300,
    fontFamily: 'arial',
    color: 'white',
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  order: {
    cursor: 'pointer',
  },
}));

const LatestProductMax = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { ProductMax: products } = props;

  console.log(products);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={
        //   <Button color="primary" size="small" variant="outlined">
        //     New entry
        //   </Button>
        // }
        title="Sản phẩm mua nhiều trong tháng"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Tên
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Hình ảnh
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Mô tả
                  </TableCell>
                  {/* <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Mô tả
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell> */}

                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.order}>
                {products.map((product, key) => (
                  <TableRow hover key={key}>
                    <TableCell
                      style={{
                        width: '5%',
                      }}
                    >
                      {key + 1}
                    </TableCell>

                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/product/${product.productId}/detail`}
                      component={routerLink}
                      style={{
                        width: '20%',
                        fontSize: '18px',
                      }}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/product/${product.productId}/detail`}
                      component={routerLink}
                      style={{
                        width: '20%',
                      }}
                    >
                      <CardMedia
                        className={classes.card}
                        component="img"
                        height="240"
                        image={
                          product
                            ? `data:image/jpeg;base64,${product.image}`
                            : ''
                        }
                        alt={product.name}
                        title="Contemplative Reptile"
                      />
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      // to={`/admin/product/${product.productId}/detail`}
                      // component={routerLink}
                      style={{
                        width: '32%',
                        fontSize: '18px',
                      }}
                    >
                      {product ? product.description : ''}
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      style={{
                        width: '10%',
                      }}
                      // to={`/admin/product/${product.productId}/detail`}
                      // component={routerLink}
                    >
                      <span className="ff-arial fs-18">
                        {product.count} đơn hàng đặt
                      </span>
                    </TableCell>

                    <TableCell
                      style={{
                        width: '18%',
                      }}
                    >
                      {/* {moment(product.createdAt).format('DD/MM/YYYY')} */}
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="update"
                          to={`/admin/product-update/${product.productId}`}
                          component={routerLink}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestProductMax.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  // orders: makeSelectOrderByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    // onLoad: () => {
    //   dispatch(getAllOrderByAdminRequest());
    // },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(LatestProductMax);
