import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../../../../../containers/App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = props => {
  const { className, account, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={
          account.image
            ? `data:image/jpeg;base64,${account.image}`
            : account.image
        }
        to="/admin/account"
      />
      <Typography className={classes.name} variant="h6">
        {account.lastName + ' ' + account.firstName}
      </Typography>
      {/* <Typography variant="body2">{account.bio}</Typography> */}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectUser(),
  //loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Profile);
