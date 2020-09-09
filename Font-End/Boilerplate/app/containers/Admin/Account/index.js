import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import reducer from 'containers/App/reducer';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from '../../App/selectors';
import AccountDetails from './components/AccountDetails';
import AccountProfile from './components/AccountProfile';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

Account.propTypes = {
  account: PropTypes.object.isRequired,
};

function Account(props) {
  //useInjectReducer({ key: 'Account', reducer });
  //useInjectSaga({ key: 'Account', saga });
  const classes = useStyles();

  const { account } = props;
  console.log(account);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile account={account} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  account: makeSelectUser(),
  //loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Account);
