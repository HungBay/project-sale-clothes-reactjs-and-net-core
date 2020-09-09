/**
 *
 * SizePage
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
import makeSelectAdd from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import messages from './../messages';

import { makeSelectALLRepos } from 'containers/App/selectors';
import { getAllRequest, selectRepos, deleteRecordOfSizeRequest } from 'containers/App/actions';
export function SizePage({
  repos,
  onLoad,
  onUpdate,
  onDelete
}) {
  useInjectReducer({ key: 'sizePage', reducer });
  useInjectSaga({ key: 'sizePage', saga });

  useEffect(() => {
    onLoad()
  }, [repos])

  return (
    <div>
      <Helmet>
        <title>SizePage</title>
        <meta name="description" content="Description of SizePage" />
      </Helmet>
      <a href="/Admin/Size-Add" className="btn btn-primary">Add+</a>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Created Date</th>
            <th scope="col">Updated Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            repos.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.createdDate}</td>
                <td>{item.updatedDate}</td>
                <td>{item.status}</td>
                <td>
                  <a onClick={(e) => onUpdate(e, item)} href={"/Admin/Size-Update/" +item.id} className="btn btn-primary">Update</a> | <a href="#" onClick={(e) => onDelete(e, item)} className="btn btn-danger">Delete</a>
                </td>
              </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

SizePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  repos: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  //sizePage: makeSelectSizePage(),
  repos: makeSelectALLRepos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: () => {
      dispatch(getAllRequest());
    },
    onUpdate: (e, item) => {
      dispatch(selectRepos(item));
      //console.log(item.name);
    },
    onDelete: (e, item) => {
      dispatch(selectRepos(item));
      if (item != null) {
        dispatch(deleteRecordOfSizeRequest());
        setTimeout(() => {
          dispatch(getAllRequest());
        }, 100);
      }
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
)(SizePage);
