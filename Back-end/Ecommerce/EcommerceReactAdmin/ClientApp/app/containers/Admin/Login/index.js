/**
 *
 * Login
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeUsername, changePassword, loginRequest } from '../../App/actions';

import {
  makeSelectChangeUsername, makeSelectChangePassword, makeSelectToken
} from '../../App/selectors';

export function Login({
    loading,
    error,
    token,
    username,
    password,
    onChangeUsername,
    onChangePassword,
    onLogin
}) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of SizePage" />
      </Helmet>
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">

            <div className="form-group">
              <div className="form-label-group">
                <input type="text" className="form-control" placeholder="Username" autoFocus
                  
                  onChange={(e) => onChangeUsername(e)}
                />
               
              </div>
            </div>
            <div class="form-group">
              <div class="form-label-group">
                <input type="password" className="form-control" placeholder="Password"
                  
                  onChange={(e) => onChangePassword(e)}
                />
              </div>
            </div>
            <a className="btn btn-primary btn-block" onClick={(e) => onLogin(e, username, password, token)}>Login</a>
            <div className="text-center">
              <a className="d-block small mt-3" href="register.html">Register an Account</a>
              <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  username: makeSelectChangeUsername(),
  passowrd: makeSelectChangePassword(),
  token: makeSelectToken()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeUsername: evt => {
      dispatch(changeUsername(evt.target.value));
    },
    onChangePassword: evt => {
      dispatch(changePassword(evt.target.value));
    },
    onLogin: (e, u, p,tk) => {
      dispatch(loginRequest());
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
)(Login);
