/**
 *
 * SizePage
 *
 */

import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import renderField from 'components/InputCustom/Field';
import { required } from 'components/InputCustom/validate';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  makeSelectError,
  makeSelectIsAuthenticated,
} from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link, Link as RouterLink, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { loginRequest } from '../../../App/actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
    zIndex: 99,
  },
  imageMain: {
    width: '100%',
    height: '100%',
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  // title: {
  //   marginTop: theme.spacing(3),
  // },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SignIn = props => {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const classes = useStyles();
  const {
    err,
    handleSubmit,
    invalid,
    submitting,
    Login,
    history,
    isAuthenticated,
    location,
  } = props;
  const handleSubmitForm = data => {
    Login(data);
  };

  const handleBack = () => {
    history.goBack();
  };

  const [sigup, setSigup] = useState();
  const responseFacebook = response => {
    console.log(response);
    var res = response.profileObj;
    console.log(res);
    setSigup(response);
  };
  const loginFaceBook = e => {
    console.log(e.target.value);
    console.log(sigup);
  };
  console.log('sigup', sigup);
  return (
    <div>
      <Helmet>
        <title>SignIn</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      {!isAuthenticated ? (
        <div className={classes.root}>
          <Grid className={classes.grid} container>
            <Grid className={classes.quoteContainer} item lg={5}>
              <div className={classes.quote}>
                <div className={classes.quoteInner}>
                  <img
                    src="https://cafebiz.cafebizcdn.vn/thumb_w/600/2014/1-7buockinhdonhthoitrangonline5262-1-1412740629959.jpg"
                    className={classes.imageMain}
                  />
                </div>
              </div>
            </Grid>
            <Grid className={classes.content} item lg={7} xs={12}>
              <div className={classes.content}>
                <div className={classes.contentHeader}>
                  <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <div className={classes.contentBody}>
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit(handleSubmitForm)}
                  >
                    <Typography className={classes.title} variant="h2">
                      Đăng nhập
                    </Typography>
                    <Grid
                      className={classes.socialButtons}
                      container
                      spacing={2}
                    >
                      <Grid item>
                        {/* <FacebookIcon className={classes.socialIcon} /> */}
                        {/* <FacebookLogin
                          buttonStyle={{ padding: '6px' }}
                          appId="1337161213139717"
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          icon="fa-facebook"
                          onClick={loginFaceBook}
                        /> */}
                      </Grid>
                      <Grid item>
                        {/* <Button
                        onClick={handleSignIn}
                        size="large"
                        variant="contained"
                      >
                        <GoogleIcon className={classes.socialIcon} />
                        Đăng nhập Google
                      </Button> */}
                      </Grid>
                    </Grid>
                    {/* <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with email address
                    </Typography> */}
                    <Field
                      id="username"
                      label="Username"
                      type="text"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      name="username"
                      variant="outlined"
                      component={renderField}
                      validate={required}
                    />
                    <Field
                      id="password"
                      label="Password"
                      type="password"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      name="password"
                      variant="outlined"
                      component={renderField}
                      validate={required}
                    />
                    <Typography style={{ color: 'red' }}>
                      {err !== null ? (typeof err === 'string' ? err : '') : ''}
                    </Typography>
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={invalid || submitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Đăng nhập
                    </Button>
                    <Typography color="textSecondary" variant="body1">
                      Đăng ký tài khoản?{' '}
                      <Link component={RouterLink} to="/dang-ky" variant="h6">
                        Đăng ký
                      </Link>
                    </Typography>
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Redirect to={{ pathname: '/dashboard', state: { from: location } }} />
      )}
    </div>
  );
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  err: makeSelectError(),
  isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    Login: data => {
      dispatch(loginRequest(data));
    },
  };
}

const FORM_NAME = 'LOGIN_ADMIN';

const withReduxForm = reduxForm({
  form: FORM_NAME,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withReduxForm,
  memo,
)(SignIn);
