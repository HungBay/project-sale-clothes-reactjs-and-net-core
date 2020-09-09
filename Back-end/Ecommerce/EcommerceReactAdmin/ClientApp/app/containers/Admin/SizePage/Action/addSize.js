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
import makeSelectAdd from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import messages from './../messages';

import { changeNameOfSize, createRecordOfSizeRequest } from 'containers/App/actions';
import { makeSelectChangeNameOfSize } from 'containers/App/selectors';

export function AddSize(
  {
    name,
    onChangeNameOfSize,
    onPost
  }) {
  useInjectReducer({ key: 'addSize', reducer });
  useInjectSaga({ key: 'addSize', saga });

  return (
    <div>
      <Helmet>
        <title>AddSize</title>
        <meta name="description" content="Description of Add" />
      </Helmet>
      <div className="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" value={name == false || name == null ? '' : name} onChange={(e) => onChangeNameOfSize(e)} />
          </div>          
        </div>
        <button className="btn btn-primary" onClick={() => onPost()}>Post</button>
      </div>
</div>
  );
}

AddSize.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //addSize: makeSelectAdd(),
  name: makeSelectChangeNameOfSize(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeNameOfSize: e => {
      if (e.target.value != null || e.target.value != false) {
        dispatch(changeNameOfSize(e.target.value));
      }
    },
    onPost: () => {
      dispatch(createRecordOfSizeRequest());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddSize);
