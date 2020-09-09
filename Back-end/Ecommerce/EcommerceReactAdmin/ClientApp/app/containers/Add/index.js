/**
 *
 * Add
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdd from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Add() {
  useInjectReducer({ key: 'add', reducer });
  useInjectSaga({ key: 'add', saga });

  return (
    <div>
      <Helmet>
        <title>Add</title>
        <meta name="description" content="Description of Add" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Add.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  add: makeSelectAdd(),
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
)(Add);
