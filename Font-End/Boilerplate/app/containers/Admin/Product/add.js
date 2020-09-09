/**
 *
 * SizePage
 *
 */

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import DropZoneField from 'components/InputCustom/Upload/DropzoneField';
import {
  getAllCategoryByAdminRequest,
  getAllColorByAdminRequest,
} from 'containers/App/actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
//import renderCheckbox from '../../../components/InputCustom/Checkbox';
import renderTextField from '../../../components/InputCustom/Field';
import {
  makeSelectCategoryByAdmin,
  makeSelectColorByAdmin,
  makeSelectSizeByAdmin,
} from '../../App/selectors';
import CheckboxField from './checkbox';
import {
  addProductByAdminRequest,
  getAllSizeByAdminRequest,
} from '../../App/actions';
import Input from '@material-ui/core/Input';

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
  value || typeof value === 'number' ? undefined : 'Required';
const imageIsRequired = value => (!value ? 'Required' : undefined);
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const maxLength = max => value =>
  value && value.length > max ? `Tên sản phẩm bé hơn ${max} ký tự` : undefined;
const maxLength50 = maxLength(50);
const minLength = min => value =>
  value && value.length < min ? `Tên sản phẩm lớn hơn ${min} ký tự` : undefined;
const minLength5 = minLength(5);

export function ProductAdd(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const {
    className,
    // handleSubmit,
    pristine,
    invalid,
    submitting,
    addProduct,
    onLoad,
    categories,
    colors,
    sizes,
  } = props;

  console.log(colors);
  const classes = useStyles();

  useEffect(() => {
    onLoad();
  }, [categories || colors || sizes]);
  // const [imageFile, setImageFile] = useState([]);

  // const handleSubmitForm = data => {
  //   var oldValues = data.categories || [];
  //   var map = { productCategories: [] };
  //   if (oldValues) {
  //     oldValues.forEach(function(v) {
  //       map.productCategories = map.productCategories.concat({ categoryId: v });
  //     });
  //   }
  //   console.log(oldValues);
  //   console.log(map);
  //   console.log(Object.assign(map, data));
  //   const fd = new FormData();
  //   fd.append('imageFile', data.imageToUpload.file);
  // };
  // const handleOnDrop = (newImageFile, onChange) => {
  //   const imageFile = {
  //     file: newImageFile[0],
  //     name: newImageFile[0].name,
  //     preview: URL.createObjectURL(newImageFile[0]),
  //     size: newImageFile[0].size,
  //   };

  //   setImageFile({ imageFile: [imageFile] }, () => onChange(imageFile));
  // };
  // useEffect(() => {
  //   onLoad();
  // }, []);

  // const formatCurrency = input => {
  //   if (!input) return;
  //   return input.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // };
  // const normalizeCurrency = val => {
  //   return val.replace(/,/g, '');
  // };

  const [data, setData] = useState({
    name: '',
    unitPrice: '',
    promotionPrice: 0,
    quantity: '',
    unit: '',
    image: '',
    imagePreviewUrl: '',
    productCategories: [],
    productSizes: [],
    productColors: [],
    files: [],
    imagePreviewUrls: [],
  });

  const findProductInCart = (productCategories, value) => {
    let index = -1;
    if (productCategories.length > 0) {
      for (let i = 0; i < productCategories.length; i++) {
        if (productCategories[i].categoryId === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  };
  const findProductInSizes = (productSizes, value) => {
    let index = -1;
    if (productSizes.length > 0) {
      for (let i = 0; i < productSizes.length; i++) {
        if (productSizes[i].sizeId === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  };
  const findProductInColors = (productColors, value) => {
    let index = -1;
    if (productColors.length > 0) {
      for (let i = 0; i < productColors.length; i++) {
        if (productColors[i].colorId === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  };

  const handleChange = e => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    setData({ ...data, [name]: value });
  };

  const handleCheckbox = event => {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      console.log(value);
      setData({
        ...data,
        productCategories: data.productCategories.concat({ categoryId: value }),
      });
    } else {
      let index = findProductInCart(data.productCategories, value);
      if (index !== -1) {
        console.log(data.productCategories.splice(index, 1));
      } else {
        console.log(index);
      }
    }
  };
  const handleCheckboxColors = event => {
    const target = event.target;
    var value = target.value;

    console.log("id", value);
    if (target.checked) {
      setData({
        ...data,
        productColors: data.productColors.concat({ colorId: value }),
      });
    } else {
      let index = findProductInColors(data.productColors, value);
      if (index !== -1) {
        console.log(data.productColors.splice(index, 1));
      } else {
        console.log(index);
      }
    }
  };
  const handleCheckboxSizes = event => {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      setData({
        ...data,
        productSizes: data.productSizes.concat({ sizeId: value }),
      });
    } else {
      let index = findProductInSizes(data.productSizes, value);
      if (index !== -1) {
        console.log(data.productSizes.splice(index, 1));
      } else {
        console.log(index);
      }
    }
  };
  const handleChangeFile = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setData({
        ...data,
        image: file,
        imagePreviewUrl: reader.result,
      });
      console.log(file);
    };

    reader.readAsDataURL(file);
  };

  const handleChangeMutileFile = e => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ev => {
            resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        });
      }),
    ).then(
      images => {
        setData({ ...data, files, imagePreviewUrls: images });
      },
      error => {
        console.error(error);
      },
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    addProduct(data);
    //console.log(data);
  };

  return (
    <div>
      <Helmet>
        <title>Product Add</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <Card className={clsx(classes.root, className)}>
        <form autoComplete="off" onSubmit={e => handleSubmit(e)}>
          <CardHeader
            className={classes.CreateProduct}
            subheader="The information can be edited"
            title="Product"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  margin="dense"
                  name="name"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  //validate={[required, maxLength50, minLength5]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Giá sản phẩm"
                  margin="dense"
                  name="unitPrice"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  // format={formatCurrency}
                  // normalize={normalizeCurrency}
                  //validate={[required, number]}
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
                <TextField
                  fullWidth
                  label="Mô tả"
                  margin="dense"
                  name="description"
                  required
                  multiline
                  rows="4"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Giá khuyến mại"
                  margin="dense"
                  name="promotionPrice"
                  required
                  multiline
                  variant="outlined"
                  onChange={handleChange}
                  //validate={[required]}
                />
                <TextField
                  fullWidth
                  label="Số lượng"
                  margin="dense"
                  name="quantity"
                  required
                  multiline
                  variant="outlined"
                  onChange={handleChange}
                  //validate={[required]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {categories.length > 0
                  ? categories.map(item => (
                      <label key={item.key}>
                        {/* {item.name} */}
                        <FormControlLabel
                          value={item.id}
                          control={<Checkbox color="primary" />}
                          label={item.name}
                          labelPlacement="end"
                          name="productCategories"
                          onChange={handleCheckbox}
                        />
                      </label>
                    ))
                  : ''}
                <br />

                {sizes.length > 0
                  ? sizes.map(item => (
                      <FormControlLabel
                        value={item.id}
                        control={<Checkbox color="primary" />}
                        label={item.name}
                        labelPlacement="end"
                        name="productSizes"
                        onChange={handleCheckboxSizes}
                      />
                    ))
                  : ''}
                <br />
                {colors.length > 0
                  ? colors.map(item => (
                      <FormControlLabel
                        value={item.id}
                        control={<Checkbox color="primary" />}
                        label={item.name}
                        labelPlacement="end"
                        name="productColors"
                        onChange={handleCheckboxColors}
                      />
                    ))
                  : ''}
                <br />
                {/* {colors.length > 0
                  ? colors.map(item => (
                      <FormControlLabel
                        value={item.id}
                        control={<Checkbox color="primary" />}
                        label={item.name}
                        labelPlacement="end"
                        name="productColors"
                        onChange={handleCheckboxColors}
                      />
                    ))
                  : ''} */}
              </Grid>
              <Grid item md={6} xs={12} />
              {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Đơn vị"
                  margin="dense"
                  name="unit"
                  required
                  select
                  rows="5"
                  variant="outlined"
                  //validate={[required]}
                >
                  <MenuItem value="bo" selected>
                    Bộ
                  </MenuItem>
                  <MenuItem value="chiec">Chiếc</MenuItem>
                </TextField>
              </Grid> */}
            </Grid>
          </CardContent>
          <Divider />
          <CardHeader
            className={classes.CreateProduct}
            subheader="Upload hình ảnh hoặc nhiều hình ảnh"
            title="Hình ảnh"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <input
                  fullWidth
                  margin="dense"
                  type="file"
                  name="image"
                  // variant="outlined"
                  onChange={handleChangeFile}

                  //validate={[required, maxLength50, minLength5]}
                />
                <CardMedia
                  className={classes.card}
                  component="img"
                  height={data.imagePreviewUrl ? '240' : 0}
                  style={{
                    marginTop: '8px',
                    width: '40%',
                  }}
                  image={data.imagePreviewUrl ? data.imagePreviewUrl : ''}
                  alt=""
                  title="Contemplative Reptile"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <input
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleChangeMutileFile}
                />
                <Grid container>
                  {data.imagePreviewUrls.length > 0
                    ? data.imagePreviewUrls.map((imagePreviewUrl, index) => (
                        <Grid item xs={3} md={3}>
                          <CardMedia
                            key={index}
                            className={classes.card}
                            component="img"
                            height={imagePreviewUrl ? '140' : 0}
                            style={{
                              marginTop: '8px',
                              width: '100%',
                              display: 'flex',
                            }}
                            image={imagePreviewUrl}
                            alt=""
                            title="Contemplative Reptile"
                          />
                        </Grid>
                      ))
                    : ''}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Grid className={classes.ProfileButton}>
            <CardActions>
              <Button
                // disabled={pristine || invalid || submitting}
                color="primary"
                variant="contained"
                type="submit"
              >
                Save details
              </Button>
            </CardActions>
          </Grid>
        </form>
        {/* <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <CardHeader
            className={classes.CreateProduct}
            subheader="The information can be edited"
            title="Profile"
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
                  format={formatCurrency}
                  normalize={normalizeCurrency}
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
                <Field
                  name="image"
                  component={DropZoneField}
                  type="file"
                  imagefile={imageFile}
                  handleOnDrop={handleOnDrop}
                  validate={[imageIsRequired]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {categories.map(category => (
                  <Field
                    key={category.id}
                    fullWidth
                    name="categories"
                    initialValue={category.name}
                    itemValue={category.id}
                    component={renderCheckbox}
                  />
                ))}
              </Grid>
              <Grid item md={6} xs={12}>
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
        </form> */}
      </Card>
    </div>
  );
}

ProductAdd.propTypes = {
  className: PropTypes.object,
  // handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,

  categories: PropTypes.any,
  colors: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategoryByAdmin(),
  colors: makeSelectColorByAdmin(),
  sizes: makeSelectSizeByAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(getAllCategoryByAdminRequest());
      dispatch(getAllColorByAdminRequest());
      dispatch(getAllSizeByAdminRequest());
    },
    addProduct: data => {
      dispatch(addProductByAdminRequest(data));
    },
  };
}

const FORM_NAME = 'PRODUCT_ADD';

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
  memo,
)(ProductAdd);
