import React from 'react';
import PropTypes, { bool } from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    position: 'absolute',
    bottom: theme.spacing(1),
    zIndex: -1,
  },
}));

const Footer = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://www.facebook.com/seven.hung.3997"
          target="_blank"
        >
          Hung7
        </Link>
        - {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption">
        Created with love for the environment. By designers and developers who
        love to work together in offices!
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
