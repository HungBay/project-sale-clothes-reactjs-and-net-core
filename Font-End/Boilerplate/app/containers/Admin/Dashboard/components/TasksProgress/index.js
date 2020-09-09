import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 50,
    width: 50,
  },
  icon: {
    height: 32,
    width: 32,
  },
  progress: {
    marginTop: theme.spacing(3),
  },
}));

const TasksProgress = props => {
  const { className, orders, ...rest } = props;

  const classes = useStyles();

  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   var count_order = orders.filter(x => x.statusOrder === 0);
  //   console.log(orders.lenght);
  //   setCount(orders.lenght);
  // }, []);
  // console.log(
  //   orders
  //     ? orders.filter(x => x.statusOrder === 0 && x.createDate === null).length
  //     : 0,
  // );
  //console.log(count);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              ĐƠN HÀNG CHƯA XÁC NHẬN
            </Typography>
            <Typography variant="h3">

              {orders
                ? orders.filter(
                    x => x.statusOrder === 0 && x.createDate === null
                  ).length
                : 0}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={75.5}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array,
};
export default TasksProgress;
