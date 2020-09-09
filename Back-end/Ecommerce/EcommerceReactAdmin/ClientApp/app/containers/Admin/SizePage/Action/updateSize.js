/**
 *
 * Add
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './../reducer';
import saga from './../saga';
import messages from './../messages';

import { makeSelectSelectedRepos } from 'containers/App/selectors';
import { updateRecordOfSizeRequest } from 'containers/App/actions';
export function UpdateSize({
  repos,
  onLoad
}) {
  useInjectReducer({ key: 'updateSize', reducer });
  useInjectSaga({ key: 'updateSize', saga });

  useEffect(() => {
    onLoad()
  }, [])

  
  return (
    <div>
      <Helmet>
        <title>UpdateSize</title>
        <meta name="description" content="Description of Add" />
      </Helmet>
      <div className="row">
        <div class="col-md-6">
          <div class="form-group">
            <label asp-for="Name"></label>
            <input type="text" class="form-control" asp-for="Name" />
            
          </div>
          <div class="form-group">
            <label asp-for="TypeProductId"></label>

          </div>
          <div class="form-group">
            <label asp-for="Unit"></label>
            <select asp-for="Unit" class="form-control">
              <option value="hộp">hộp</option>
              <option value="cái">cái</option>
            </select>
            
          </div>
          
        </div>
      </div>
</div>
  );
}

UpdateSize.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //addSize: makeSelectAdd(),
  repos: makeSelectSelectedRepos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(updateRecordOfSizeRequest());
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
)(UpdateSize);
