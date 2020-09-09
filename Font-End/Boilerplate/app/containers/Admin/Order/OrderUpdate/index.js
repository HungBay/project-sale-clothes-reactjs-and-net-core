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
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  getOrderByAdminRequest,
  updateOrderByAdminRequest,
} from '../../../App/actions';
import {
  makeSelectSelectOrderByAdmin,
  makeSelectUser,
} from '../../../App/selectors';
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

export function OrderUpdate(props) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const {
    match,
    category,
    onLoad,
    isLoading,
    history,
    order,
    update,
    user,
  } = props;

  console.log(order);
  const classes = useStyles();

  useEffect(() => {
    onLoad(match.params.id);
  }, [match.params.id]);

  const handleBack = () => {
    history.goBack();
  };

  const [value, setValue] = React.useState('0');
  const [datetime, setDatetime] = useState('2020-07-20T10:30');
  const handleChange = event => {
    setValue(event.target.value);
  };
  const onChangeDateTime = e => {
    setDatetime(e.target.value);
  };
  const handleSubmitForm = e => {
    e.preventDefault();
    var statusOrder = parseInt(value, 10);

    if (
      user &&
      match.params.id !== undefined &&
      statusOrder !== undefined &&
      order
    ) {
      update(statusOrder, datetime, match.params.id, user.id, order.user.id);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Cập nhật đơn hàng</title>
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
                <form onSubmit={handleSubmitForm}>
                  <CardHeader
                    className={classes.CreateProduct}
                    // subheader="cập nhật thông tin tên danh mục"
                    title="Cập nhật đơn hàng"
                  />

                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="gender"
                            name="OrderStatus"
                            value={value}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              disabled={
                                order
                                  ? order.statusOrder >= 0
                                    ? true
                                    : false
                                  : false
                              }
                              value="0"
                              control={<Radio />}
                              label="CREATE"
                            />
                            <FormControlLabel
                              disabled={
                                order
                                  ? order.statusOrder >= 1
                                    ? true
                                    : false
                                  : false
                              }
                              value="1"
                              control={<Radio />}
                              label="SHIPPING"
                            />
                            <FormControlLabel
                              disabled={
                                order
                                  ? order.statusOrder >= 2
                                    ? true
                                    : false
                                  : false
                              }
                              value="2"
                              control={<Radio />}
                              label="DELIVERED"
                            />
                            <FormControlLabel
                              value="3"
                              disabled={
                                order
                                  ? order.statusOrder === 3
                                    ? true
                                    : false
                                  : false
                              }
                              control={<Radio />}
                              label="PAID"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <form className={classes.container} noValidate>
                          <TextField
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue="2020-07-20T10:30"
                            onChange={onChangeDateTime}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </form>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Grid className={classes.ProfileButton}>
                    <CardActions>
                      <Button
                        //disabled={pristine || invalid || submitting}
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Cập nhật
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

OrderUpdate.propTypes = {
  onLoad: PropTypes.func,
  match: PropTypes.object,
  category: PropTypes.object,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  order: makeSelectSelectOrderByAdmin(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoad: id => {
      setTimeout(() => {
        dispatch(getOrderByAdminRequest(id));
      }, 3000);
    },
    update: (value, datetime, id, employeeId, userId) => {
      //console.log(value, datetime, id, employeeId, userId);
      dispatch(
        updateOrderByAdminRequest(value, datetime, id, employeeId, userId),
      );
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
)(OrderUpdate);
