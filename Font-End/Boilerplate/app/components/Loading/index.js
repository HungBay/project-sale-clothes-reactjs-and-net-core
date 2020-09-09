import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectShowLoading } from '../../containers/App/selectors';
import LoadingIcon from '../../content/images/loading.gif';
import './loading.css';

function Loading(props) {
  const { showLoading } = props;
  let xhtml = null;
  if (showLoading) {
    xhtml = (
      <div className="Loading">
        <img src={LoadingIcon} alt="loading" className="iconloading"/>
      </div>
    );
  }
  return xhtml;
}

Loading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  showLoading: makeSelectShowLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  // styles,
)(Loading);
