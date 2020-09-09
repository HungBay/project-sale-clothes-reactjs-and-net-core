import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectAllCustomersByAdmin } from '../../../../App/selectors';
import { createStructuredSelector } from 'reselect';

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
    backgroundColor: theme.palette.success.main,
    height: 50,
    width: 50,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.success.dark,
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
}));

const TotalUsers = props => {
  const { className, customers, ...rest } = props;

  //console.log(customers);
  const classes = useStyles();

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
              TỔNG NGƯỜI DÙNG
            </Typography>
            <Typography variant="h3">{customers.length} người</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};
const mapStateToProps = createStructuredSelector({
  customers: makeSelectAllCustomersByAdmin(),
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
  null,
);
export default compose(withConnect)(TotalUsers);
