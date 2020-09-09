import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

function ApexChart(props) {
  const { className, charts, ...rest } = props;

  const classes = useStyles();

  const setCategories = () => {
    var category = [];
    charts.map(res => {
      category = category.concat(`${res.day}/${res.month}/${res.year}`);
    });

    return category;
  };
  const setSeriesTotalMoney = () => {
    var Total = [];
    charts.map(res => {
      Total = Total.concat(`${res.total}`);
    });
    return Total;
  };
  const setSeriesCountByDay = () => {
    var Count = [];
    charts.map(res => {
      Count = Count.concat(`${res.count}`);
    });
    return Count;
  };

  const [chart] = useState({
    series: [
      {
        name: 'Tổng tiền',
        type: 'column',
        data: setSeriesTotalMoney(),
      },
      {
        name: 'Tổng đơn hàng',
        type: 'line',
        data: setSeriesCountByDay(),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      title: {
        text: '',
        align: 'left',
        offsetX: 110,
      },
      xaxis: {
        categories: setCategories(),
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
            formatter: function(value) {
              value = value.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              });
              return value;
            },
          },
          title: {
            // text: 'Tổng tiền',
            style: {
              color: '#008FFB',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: '',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: 'rgb(0, 227, 150)',
          },
          labels: {
            style: {
              colors: 'rgb(0, 227, 150)',
            },
          },
          title: {
            // text: 'Tổng sản phẩm',
            style: {
              color: 'rgb(0, 227, 150)',
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
        y: {
          formatter: function(value) {
            value = value.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            });
            return value;
          },
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    },
  });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Thông kê theo ngày" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          {/* <Bar data={data} options={options} /> */}
          <div id="chart">
            {charts ? (
              <ReactApexChart
                options={chart.options}
                series={chart.series}
                type="line"
                height={450}
              />
            ) : (
              <ReactApexChart
                options={chart.options}
                series={chart.series}
                type="line"
                height={450}
              />
            )}
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          {/* Overview <ArrowRightIcon /> */}
          <br />
        </Button>
      </CardActions>
    </Card>
  );
}

export default ApexChart;
