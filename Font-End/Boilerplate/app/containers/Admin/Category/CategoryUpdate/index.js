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
  makeStyles,
  Paper,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeSelectLoading } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import renderTextField from '../../../../components/InputCustom/Field';
import {
  getCategoryByIdRequest,
  updateCategoryByIdRequest,
} from '../../../App/actions';
import { makeSelectCategoryById } from '../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  ProfileButton: {
    marginLeft: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    padding: theme.spacing(1),
  },
  title: {
    margin: 0,
    textAlign: 'left',
  },
  paper: {
    padding: theme.spacing(2),
  },
  status: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: 14,
  },
  statusOrder: {
    fontSize: 14,
  },
  product: {
    marginBottom: theme.spacing(2),
  },
  img: {
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  image: {
    maxWidth: 90,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  color: {
    fontSize: 16,
  },
  infoProduct: {
    marginLeft: theme.spacing(2),
  },
  unitPrice: {
    margin: theme.spacing(4),
  },
  price: { fontSize: 15 },
  info: {
    fontSize: 13,
  },
  totalAmount: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export function CategoryUpdate(props) {
  // useInjectReducer({ key: 'CategoryUpdate', reducer });
  // useInjectSaga({ key: 'CategoryUpdate', saga });

  const {
    match,
    category,
    onLoad,
    isLoading,
    history,
    handleSubmit,
    pristine,
    invalid,
    submitting,
    update,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);

  const handleBack = () => {
    history.goBack();
  };

  const handleSubmitForm = data => {
    update(data);
  };
  return (
    <div>
      <Helmet>
        <title>Cập nhật danh mục</title>
        <meta name="description" content="Description of Product" />
      </Helmet>
      <div>
        <div className={classes.contentHeader}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        {!isLoading ? (
          <Grid container spacing={1} id="pdfdiv">
            <Grid item xs={12} md={12}>
              <Paper className={classes.paper}>
                <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
                  <CardHeader
                    className={classes.CreateProduct}
                    subheader="cập nhật thông tin tên danh mục"
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
                          variant="outlined"
                          component={renderTextField}
                          //validate={[required, maxLength50, minLength5]}
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
                        Lưu
                      </Button>
                    </CardActions>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <div>...Loading</div>
        )}
      </div>
    </div>
  );
}

CategoryUpdate.propTypes = {
  onLoad: PropTypes.func,
  match: PropTypes.object,
  category: PropTypes.object,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategoryById(),
  initialValues: makeSelectCategoryById(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: id => {
      setTimeout(() => {
        dispatch(getCategoryByIdRequest(id));
      }, 3000);
    },
    update: data => {
      dispatch(updateCategoryByIdRequest(data));
    },
  };
}
const FORM_NAME = 'CATEGORY_UPDATE';

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
)(CategoryUpdate);
