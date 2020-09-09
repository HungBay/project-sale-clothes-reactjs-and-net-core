/**
 *
 * SizePage
 *
 */

import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Card,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import renderTextField from '../../../components/InputCustom/Field';
import {
  getProductByAdminRequest,
  updateProductByAdminRequest,
} from '../../App/actions';
import { makeSelectSelectProductByAdmin } from '../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {},
  ProfileButton: {
    marginLeft: theme.spacing(1),
  },
  CreateProduct: {
    marginLeft: theme.spacing(0),
  },
}));

const required = value =>
  value || typeof value === 'number' ? undefined : 'Yêu cầu không được để trống';
const number = value =>
  value && isNaN(Number(value)) ? 'Phải là số' : undefined;
const maxLength = max => value =>
  value && value.length > max ? `Tên sản phẩm bé hơn ${max} ký tự` : undefined;
const maxLength50 = maxLength(50);
const minLength = min => value =>
  value && value.length < min ? `Tên sản phẩm lớn hơn ${min} ký tự` : undefined;
const minLength5 = minLength(5);
export function ProductUpdate(props) {
  // useInjectReducer({ key: 'global', reducer });
  // useInjectSaga({ key: 'global', saga });

  const {
    handleSubmit,
    pristine,
    invalid,
    submitting,
    onLoad,
    match,
    updateProduct,
    history,
    initialValues,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    onLoad(match.params.id);
  }, []);

  const handleSubmitForm = data => {
    updateProduct(data);
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
                    label="Tên sản phẩm"
                    margin="dense"
                    name="name"
                    required
                    className={classes.textfield}
                    variant="outlined"
                    component={renderTextField}
                    validate={[required, maxLength50, minLength5]}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    fullWidth
                    label="Giá sản phẩm"
                    margin="dense"
                    name="unitPrice"
                    required
                    variant="outlined"
                    component={renderTextField}
                    validate={[required, number]}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            VND
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    fullWidth
                    label="Mô tả"
                    margin="dense"
                    name="description"
                    required
                    multiline
                    rows="5"
                    variant="outlined"
                    component={renderTextField}
                    validate={[required]}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  {/* {categories.map(category => (
                  <Field
                    key={category.id}
                    fullWidth
                    name="categories"
                    initialValue={category.name}
                    itemValue={category.id}
                    component={renderCheckbox}
                  />
                ))} */}
                </Grid>
                {/* <Grid item md={6} xs={12}>
                <Field
                  fullWidth
                  label="Đơn vị"
                  margin="dense"
                  name="unit"
                  required
                  select
                  rows="5"
                  variant="outlined"
                  component={renderTextField}
                  validate={[required]}
                >
                  <MenuItem value="bo" selected>
                    Bộ
                  </MenuItem>
                  <MenuItem value="chiec">Chiếc</MenuItem>
                </Field>
              </Grid> */}
                <Grid item md={6} xs={12}>
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
                        initialValues
                          ? initialValues.image !== null
                            ? `data:image/jpeg;base64,${initialValues.image}`
                            : ''
                          : ''
                      }
                      alt="preview"
                      className="preview-image"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  )}
                  <Field
                    fullWidth
                    label="Upload"
                    margin="dense"
                    name="image"
                    type="file"
                    component={renderFileInput}
                  />
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

ProductUpdate.propTypes = {
  onLoad: PropTypes.func,
  match: PropTypes.object,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  updateProduct: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  initialValues: makeSelectSelectProductByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: id => {
      dispatch(getProductByAdminRequest(id));
    },
    updateProduct: data => {
      dispatch(updateProductByAdminRequest(data));
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
  memo,
)(ProductUpdate);
