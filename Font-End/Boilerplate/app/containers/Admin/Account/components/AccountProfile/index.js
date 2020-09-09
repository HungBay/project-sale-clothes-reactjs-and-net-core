import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
//import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
  Fab,
  Grid,
  Modal,
} from '@material-ui/core';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { uploadImageByProfileRequest } from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  button: {
    // color: blue[900],
    // margin: 10
    width: 100,
    height: 100,
  },
  input: {
    display: 'none',
  },
  avatar: {
    // marginRight: 0,
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '60vw',
    height: '80vh',
  },
  avatarEditor: {
    backgroundColor: 'red',
  },
}));

const AccountProfile = props => {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { className, account, uploadImage, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({});
  const [image, setImage] = useState({
    preview: '',
    raw: '',
    userProfilePic: '',
    editor: null,
    scaleValue: 1,
  });

  useEffect(() => {
    setValues({ ...account });
  }, [account]);

  const [open, setOpen] = useState(false);

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('image', image.raw);
    uploadImage(image.raw);
  };

  const removeChange = e => {
    const { privew, raw } = image;
    if (privew != null || raw != null) {
      setImage({ preview: '', raw: '' });
    }
  };

  const getUserProfilePic = userProfilePic => {
    setValues({
      ...values,
      image: userProfilePic,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          className={classes.details}
        >
          <div>
            <Typography gutterBottom variant="h4">
              {values.lastName + ' ' + values.firstName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {values.address}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {/* {moment().format('hh:mm A')} ({values.timezone}) */}
            </Typography>
          </div>
          {image.preview ? (
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              <Fab component="span" size="large" className={classes.button}>
                <Avatar
                  className={classes.avatar}
                  src={image.preview}
                  sizes="100"
                />
              </Fab>
            </label>
          ) : (
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                style={{ display: 'none' }}
                type="file"
                onChange={handleChange}
              />
              <Fab component="span" size="large" className={classes.button}>
                <Avatar
                  className={classes.avatar}
                  src={
                    values.image
                      ? `data:image/jpeg;base64,${values.image}`
                      : values.image
                  }
                />
              </Fab>
            </label>
          )}
        </Grid>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant="determinate" />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          disabled={!image.preview || !image.raw}
          onClick={handleUpload}
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text" onClick={removeChange}>
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  account: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    uploadImage: imageUser => {
      dispatch(uploadImageByProfileRequest(imageUser));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(AccountProfile);
