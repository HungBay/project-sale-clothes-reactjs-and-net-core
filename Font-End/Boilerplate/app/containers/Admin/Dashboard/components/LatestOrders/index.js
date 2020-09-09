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

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { orders } = props;

  //console.log(orders);
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
                  <TableCell>Order Ref</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.order}>
                {orders
                  .filter(x => x.statusOrder === 0 && x.createDate === null)
                  .splice(0, 5)
                  .map((order, key) => (
                    <TableRow hover key={key}>
                      <TableCell
                        className={classes.tablecell}
                        to={`/admin/order/${order.id}/detail`}
                        component={routerLink}
                      >
                        {order.ref}
                      </TableCell>
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          component={routerLink}
          to={`/admin/orders`}
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
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
)(LatestOrders);
