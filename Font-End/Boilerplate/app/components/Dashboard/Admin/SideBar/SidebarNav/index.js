/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { ADMIN_ROUTES, EMPLOYEE_ROUTES } from 'containers/App/routes';
import { connect } from 'react-redux';
import { makeSelectCurrentUser } from '../../../../../containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, currentUser, ...rest } = props;

  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {currentUser
        ? currentUser.role === 'Admin'
          ? ADMIN_ROUTES.map(page => (
              <ListItem className={classes.item} disableGutters key={page.name}>
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  to={page.layout + page.path}
                  style={{ fontSize: '14px' }}
                >
                  <page.icon className={classes.icon} />
                  {/* <div className={classes.icon}>{page.icon}</div> */}
                  {page.name}
                </Button>
              </ListItem>
            ))
          : EMPLOYEE_ROUTES.map(page => {
              if (page.show === 1) {
                return (
                  <ListItem
                    className={classes.item}
                    disableGutters
                    key={page.name}
                  >
                    <Button
                      activeClassName={classes.active}
                      className={classes.button}
                      component={CustomRouterLink}
                      to={page.layout + page.path}
                      style={{ fontSize: '14px' }}
                    >
                      <page.icon className={classes.icon} />
                      {/* <div className={classes.icon}>{page.icon}</div> */}
                      {page.name}
                    </Button>
                  </ListItem>
                );
              }
            })
        : ''}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(SidebarNav);
//export default SidebarNav;
