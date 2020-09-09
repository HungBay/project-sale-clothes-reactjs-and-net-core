import { Avatar, Button, InputAdornment } from '@material-ui/core';
import avt from 'images/user_1.jpg';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import renderTextField from '../../../../components/InputCustom/Field';
import {
  makeSelectIsAuthenticated,
  makeSelectUser,
} from '../../../App/selectors';
import { addReviewByProductRequest } from '../actions';

Review.propTypes = {
  reviews: PropTypes.array,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  addComment: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
};

function Review(props) {
  const {
    reviews,
    submitting,
    pristine,
    invalid,
    handleSubmit,
    addComment,
    isAuthenticated,
    user,
    resetComment,
  } = props;
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(1);
  const loadMore = () => {
    setVisible(visible + 5);
  };
  const handleSubmitForm = data => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    if (isAuthenticated === true) {
      addComment(data);
      setDisabled(false);
      resetComment();
      setImagePreviewUrl('');
    } else {
      alert('Yêu cầu đăng nhập');
    }
  };

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const handleChange = (e, input) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    input.onChange(file);
    reader.readAsDataURL(file);
  };
  const renderFileInput = ({ input, type, meta }) => {
    const { mimeType } = props;
    return (
      <div>
        <input
          name={input.name}
          type={type}
          accept={mimeType}
          onChange={event => handleChange(event, input)}
        />
      </div>
    );
  };
  return (
    <div className="tab-pane fade active in" id="reviews">
      <div className="col-md-12 col-sm-12">
        <div>
          <ul className="media-list" style={{ backgroundColor: '#FAFAFA' }}>
            {console.log(reviews)}
            {reviews
              ? reviews.slice(0, visible).map((review, index) => (
                  <li className="media" key={index}>
                    <a href="#" className="pull-left">
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          review
                            ? review.user.imageUser
                              ? `data:image/jpeg;base64,${
                                  review.user.imageUser
                                }`
                              : 'https://bootdey.com/img/Content/user_1.jpg'
                            : 'https://bootdey.com/img/Content/user_1.jpg'
                        }
                        className="large"
                      />
                    </a>
                    <div className="media-body">
                      <span className="text-muted pull-right">
                        <small className="text-muted">
                          {review
                            ? moment(review.date).format('DD/MM/YYYY H:m:s')
                            : ''}
                        </small>
                      </span>
                      <strong className="text-success">
                        {review
                          ? `${review.user.lastName} ${' '} ${
                              review.user.firstName
                            }`
                          : ''}
                      </strong>
                      <p>{review ? review.comment : ''}</p>
                      {review ? (
                        <img
                          src={`data:image/jpeg;base64,${review.image}`}
                          style={{ width: '86px' }}
                          alt=""
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </li>
                ))
              : ''}
          </ul>
          {reviews
            ? visible < reviews.length && (
                <button onClick={loadMore} type="button" className="load-more">
                  Xem thêm
                </button>
              )
            : ''}
          <hr />

          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <ul className="media-list" style={{ backgroundColor: '#FAFAFA' }}>
              <li className="media">
                <a href="#" className="pull-left">
                  {user ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        user.imageUser
                          ? `data:image/jpeg;base64,${user.image}`
                          : { avt }
                      }
                      className="large"
                    />
                  ) : (
                    <Avatar alt="Remy Sharp" src={avt} className="large" />
                  )}
                </a>
                <div className="media-body">
                  <Field
                    fullWidth
                    label="Bình luận"
                    margin="dense"
                    name="comment"
                    multiple
                    component={renderTextField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Field
                            fullWidth
                            label="Upload"
                            margin="dense"
                            name="image"
                            type="file"
                            component={renderFileInput}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="preview"
                      className="preview-image"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  ) : (
                    ''
                  )}
                  {/* <Field
                    fullWidth
                    label="Upload"
                    margin="dense"
                    name="image"
                    type="file"
                    component={renderFileInput}
                  /> */}
                  <Button
                    className="pull-right"
                    disabled={submitting || pristine || invalid}
                    variant="contained"
                    type="submit"
                  >
                    bình luận
                    {/* {disabled ? 'Bình luận..' : 'Bình luận'} */}
                  </Button>
                </div>
              </li>
            </ul>
          </form>
        </div>
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
    dispatch,
    addComment: data => {
      dispatch(addReviewByProductRequest(data));
    },
    resetComment: () => {
      dispatch(reset('COMMENT'));
    },
  };
}

const FORM_NAME = 'COMMENT';

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
)(Review);
