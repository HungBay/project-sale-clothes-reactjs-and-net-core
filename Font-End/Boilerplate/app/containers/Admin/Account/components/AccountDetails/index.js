import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import renderTextField from '../../../../../components/InputCustom/Field';
import { makeSelectUser } from '../../../../App/selectors';
import validate from './validate';

const useStyles = makeStyles(theme => ({
  root: {},
  ProfileButton: {
    marginLeft: theme.spacing(1),
  },
  ProfileTitle: {
    marginLeft: theme.spacing(0),
  },
}));

const AccountDetails = props => {
  const {
    className,
    handleSubmit,
    account,
    invalid,
    submitting,
    pristine,
  } = props;

  const classes = useStyles();

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({ ...account });
  }, [account]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = data => {
    console.log(data);
  };
  return (
    <Card className={clsx(classes.root, className)}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <CardHeader
          className={classes.ProfileTitle}
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                label="First Name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                variant="outlined"
                component={renderTextField}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                label="Last Name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                variant="outlined"
                component={renderTextField}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                label="Address"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                variant="outlined"
                component={renderTextField}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                label="Phone"
                margin="dense"
                name="phone"
                onChange={handleChange}
                required
                variant="outlined"
                component={renderTextField}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                variant="outlined"
                component={renderTextField}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Grid className={classes.ProfileButton}>
          <CardActions>
            <Button
              disabled={pristine || invalid || submitting}
              color="primary"
              variant="contained"
              type="submit"
            >
              Save details
            </Button>
          </CardActions>
        </Grid>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  account: PropTypes.any,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};
const mapStateToProps = createStructuredSelector({
  account: makeSelectUser(),
  initialValues: makeSelectUser(),
});

function mapDispatchToProps() {
  return {};
}

const FORM_NAME = 'ACCOUNT_DETAILS';

const withReduxForm = reduxForm({
  form: FORM_NAME,

  validate,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withReduxForm,
  memo,
)(AccountDetails);
