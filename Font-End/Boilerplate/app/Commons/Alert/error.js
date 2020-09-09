import { withStyles, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

function Error(props) {
  const { classes, error } = props;
  let xhtml = null;
  if (error) {
    xhtml = (
      <div className={classes.loading}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={error}
          message={error}
        />
      </div>
    );
  }
  return xhtml;
}

Error.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

export default withStyles(styles)(Error);
