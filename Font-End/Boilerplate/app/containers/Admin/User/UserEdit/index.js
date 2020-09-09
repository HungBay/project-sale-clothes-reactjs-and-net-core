import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { getUserByAdminRequest, updateUserByAdminRequest } from '../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectUserByAdmin } from '../../../App/selectors';
import {
  Divider,
  Grid,
  CardActions,
  Button,
  Card,
  IconButton,
  makeStyles,
  CardHeader,
  CardContent,
  InputAdornment,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Field, reduxForm } from 'redux-form';
import renderTextField from '../../../../components/InputCustom/Field';
UserEdit.propTypes = {};

const required = value =>
  value || typeof value === 'number' ? undefined : 'Required';
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const maxLength = max => value =>
  value && value.length > max ? `Tên sản phẩm bé hơn ${max} ký tự` : undefined;
const maxLength50 = maxLength(50);
const minLength = min => value =>
  value && value.length < min ? `Tên sản phẩm lớn hơn ${min} ký tự` : undefined;
const minLength5 = minLength(5);

const useStyles = makeStyles(theme => ({
  root: {},
  ProfileButton: {
    marginLeft: theme.spacing(1),
  },
  CreateProduct: {
    marginLeft: theme.spacing(0),
  },
}));

function UserEdit(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const classes = useStyles();
  const {
    match,
    onLoad,
    user,
    updateUser,
    pristine,
    invalid,
    submitting,
    handleSubmit,
    history,
    initialValues,
  } = props;

  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);
  console.log(user);

  const handleSubmitForm = data => {
    //updateUser(data);
    console.log(data);
  };
  const handleBack = () => {
    history.goBack();
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
  console.log(imagePreviewUrl);

  return (
    <div>
      <Helmet>
        <title>Cập nhật sản phẩm</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div className={classes.root}>
        <Card>
          <div className={classes.contentHeader}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <CardHeader
              className={classes.CreateProduct}
              subheader="Cập nhật sản phẩm"
              title="Cập nhật"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    fullWidth
                    label="Họ"
                    margin="dense"
                    name="lastName"
                    required
                    variant="outlined"
                    component={renderTextField}
                    validate={[required, maxLength50, minLength5]}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    fullWidth
                    label="Tên"
                    margin="dense"
                    name="firstName"
                    required
                    variant="outlined"
                    component={renderTextField}
                    validate={[required, maxLength50, minLength5]}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    fullWidth
                    label="Địa chỉ"
                    margin="dense"
                    name="address"
                    required
                    variant="outlined"
                    component={renderTextField}
                    validate={[required, maxLength50, minLength5]}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    fullWidth
                    label="Email"
                    margin="dense"
                    name="email"
                    required
                    variant="outlined"
                    component={renderTextField}
                    validate={[required, maxLength50, minLength5]}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    fullWidth
                    label="Số điện thoại"
                    margin="dense"
                    name="phone"
                    required
                    variant="outlined"
                    component={renderTextField}
                    // validate={[required, maxLength50, minLength5]}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    name="imageUser"
                    type="file"
                    component={renderFileInput}
                  />
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="preview"
                      className="preview-image"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={
                        user.imageUser
                          ? `data:image/jpeg;base64,${user.imageUser}`
                          : 'https://st.quantrimang.com/photos/image/072015/22/avatar.jpg'
                      }
                      alt="preview"
                      className="preview-image"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  )}
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
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUserByAdmin(),
  initialValues: makeSelectUserByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: id => {
      dispatch(getUserByAdminRequest(id));
    },
    updateUser: data => {
      dispatch(updateUserByAdminRequest(data));
    },
  };
}
const FORM_NAME = 'PRODUCT_UPDATE';

const withReduxForm = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReduxForm,
)(UserEdit);
