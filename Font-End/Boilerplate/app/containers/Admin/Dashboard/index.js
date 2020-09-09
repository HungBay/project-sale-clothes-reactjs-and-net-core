/**
 *
 * SizePage
 *
 */

import { Grid } from '@material-ui/core';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  getAllOrderByAdminRequest,
  getChartByDayRequest,
  getChartByMonthRequest,
  getProductByMaxRequest,
} from '../../App/actions';
import {
  makeSelectCharts,
  makeSelectOrderByAdmin,
  makeSelectChartMonth,
  makeSelectChartDay,
  makeSelectProductMax,
} from '../../App/selectors';
import Budget from './components/Budget';
import LatestOrders from './components/LatestOrders/index';
import ChartDay from './components/LatestSales/chart-day';
import ChartMonth from './components/LatestSales/chart-month';
import TasksProgress from './components/TasksProgress/index';
import TotalProfit from './components/TotalProfit/index';
import TotalUsers from './components/TotalUsers/index';
import LatestProductMax from './components/LatestProductMax';

export function Dashboard(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const {
    onLoad,
    orders,
    chartDay,
    chartMonth,
    ProductMax,
    onLoadProductMax,
  } = props;

  useEffect(() => {
    onLoad();
    //return () => unsubcrice();
  }, []);

  useEffect(() => {
    onLoadProductMax();
  }, [ProductMax.length]);
  return (
    <div>
      <Helmet>
        <title>Product</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget orders={orders} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress orders={orders} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit orders={orders}/>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={6}>
            <ChartDay charts={chartDay} />
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={6}>
            <ChartMonth charts={chartMonth} />
          </Grid>
          {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <UsersByDevice />
          </Grid> */}
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestProductMax ProductMax={ProductMax} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestOrders orders={orders} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrderByAdmin(),
  chartMonth: makeSelectChartMonth(),
  chartDay: makeSelectChartDay(),
  ProductMax: makeSelectProductMax(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(getAllOrderByAdminRequest());
      dispatch(getChartByDayRequest());
      dispatch(getChartByMonthRequest());
    },
    onLoadProductMax: () => {
      dispatch(getProductByMaxRequest());
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
)(Dashboard);
