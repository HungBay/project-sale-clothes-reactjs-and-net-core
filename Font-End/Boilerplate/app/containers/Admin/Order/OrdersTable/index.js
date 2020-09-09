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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
import { deleteOrderByAdminRequest } from '../../../App/actions';

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
  tablecell: {
    textDecoration: 'none',
  },
}));

const OrdersTable = props => {
  const { className, deleteOrder, ...rest } = props;

  const classes = useStyles();

  const { orders } = props;

  const handleDelete = id => {
    deleteOrder(id);
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={
        //   <Button color="primary" size="small" variant="outlined">
        //     New entry
        //   </Button>
        // }
        title="Đơn đặt hàng"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.order}>
                {orders.splice(0, 5).map((order, key) => (
                  <TableRow hover key={key}>
                    <TableCell>{key + 1}</TableCell>

                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/order/${order.id}/detail`}
                      component={routerLink}
                    >
                      {order.user.lastName + ' ' + order.user.firstName}
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/order/${order.id}/detail`}
                      component={routerLink}
                    >
                      {moment(order.orderDate).format('DD/MM/YYYY HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <p
                          className={classes.status}
                          style={{
                            backgroundColor: order
                              ? order.statusOrder === 0
                                ? '#5393ff'
                                : order.statusOrder === 1
                                ? '#007bb2'
                                : order.statusOrder === 2
                                ? '#00a152'
                                : order.statusOrder === 3
                                ? '#76ff03'
                                : ''
                              : '',
                            borderRadius: 5,
                            color: 'white',
                          }}
                        >
                          {order
                            ? order.statusOrder === 0 &&
                              order.createDate === null
                              ? 'CREATE'
                              : order.statusOrder === 0 &&
                                order.createDate !== null
                              ? 'ACCEPT'
                              : order.statusOrder === 1
                              ? 'SHIPPING'
                              : order.statusOrder === 2
                              ? 'DELIVERED'
                              : order.statusOrder === 3
                              ? 'PAID'
                              : ''
                            : ''}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {/* {moment(product.createdAt).format('DD/MM/YYYY')} */}

                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(order.id)}
                        >
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

OrdersTable.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    deleteOrder: id => {
      dispatch(deleteOrderByAdminRequest(id));
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
)(OrdersTable);
