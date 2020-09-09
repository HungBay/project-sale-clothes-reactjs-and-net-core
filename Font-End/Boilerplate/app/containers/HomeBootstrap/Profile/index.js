import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser, makeSelectIsAuthenticated } from '../../App/selectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { updateProductByAdminRequest } from '../../App/actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { updateProfileByCustomerRequest } from './actions';

Profile.propTypes = {};

function Profile(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { updateProfile, user, isAuthenticated, location } = props;

  const [profile, setProfile] = useState();
  useEffect(() => {
    setProfile(user);
  }, [user]);

  //console.log(user);
  const handleChangePassword = () => {};
  const handleChangeInformation = e => {
    const name = e.target.name;
    const value = e.target.value;
    setProfile({ ...profile, [name]: value });
  };

  const handleClickUpdateProfile = e => {
    e.preventDefault();
    updateProfile(profile);
  };
  return (
    <div>
      <Helmet>
        <title>Trang thông tin khách hàng</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div>
        {isAuthenticated ? (
          <section id="cart_items">
            <div className="container">
              <div className="breadcrumbs">
                <ol className="breadcrumb">
                  <li>
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="active color-white">Thông tin cá nhân</li>
                </ol>
              </div>
              <div className="col-sm-12">
                <div className="pull-right">
                  <span className="fs-18 ff-arial">
                    Điểm tích lũy:{' '}
                    {user
                      ? user.accumulatedPoints
                        ? user.accumulatedPoints
                        : 0
                      : ''} điểm
                  </span>
                </div>
                <div className="col-sm-6">
                  <form>
                    <div className="category-tab">
                      <h3 className="ff-arial fs-22">Tài khoản đăng nhập</h3>
                      <div className="col-sm-6 offset-3 pd-0">
                        <div className="form-group">
                          <label className="ff-arial">Tên tài khoản</label>
                          <input
                            type="text"
                            value={profile ? profile.username : ''}
                            className="form-control"
                            disabled
                            name="username"
                          />
                        </div>
                        <div className="form-group">
                          <label className="ff-arial">Mật khẩu cũ</label>
                          <input
                            type="text"
                            className="form-control"
                            name="password"
                            onChange={handleChangePassword}
                          />
                        </div>
                        <div className="form-group">
                          <label className="ff-arial">Mật khẩu</label>
                          <input
                            type="text"
                            className="form-control"
                            name="rePassword1"
                            onChange={handleChangePassword}
                          />
                        </div>
                        <div className="form-group">
                          <label className="ff-arial">Nhập lại mật khẩu</label>
                          <input
                            type="text"
                            className="form-control"
                            name="rePassword2"
                            onChange={handleChangePassword}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-outline-info btn-primary"
                        onClick={handleClickUpdateProfile}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-sm-6">
                  <form>
                    <div className="category-tab">
                      <h3 className="ff-arial fs-22">Thông tin cá nhân</h3>
                      <div className="col-sm-6 offset-3 pd-0">
                        <div className="form-group">
                          <label className="ff-arial">Họ</label>
                          <input
                            type="text"
                            value={profile ? profile.lastName : ''}
                            className="form-control"
                            name="lastName"
                            onChange={handleChangeInformation}
                          />
                        </div>
                        <div className="form-group">
                          <label className="ff-arial">Tên</label>
                          <input
                            type="text"
                            className="form-control"
                            value={profile ? profile.firstName : ''}
                            name="firstName"
                            onChange={handleChangeInformation}
                          />
                        </div>
                        <div className="form-group">
                          <label className="ff-arial">Địa chỉ</label>
                          <input
                            type="text"
                            className="form-control"
                            value={profile ? profile.address : ''}
                            name="address"
                            onChange={handleChangeInformation}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="ff-arial">Số điện thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            value={profile ? profile.phone : ''}
                            name="phone"
                            onChange={handleChangeInformation}
                          />
                        </div>
                        <div className="form-group">
                          <label className="ff-arial">Địa chỉ email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={profile ? profile.email : ''}
                            name="email"
                            onChange={handleChangeInformation}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-outline-info btn-primary"
                        onClick={handleClickUpdateProfile}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Redirect
            to={{ pathname: '/dashboard', state: { from: location } }}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  isAuthenticated: makeSelectIsAuthenticated(),
});
function mapDispatchToProps(dispatch) {
  return {
    updateProfile: data => {
      dispatch(updateProfileByCustomerRequest(data));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Profile);
