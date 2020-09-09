import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ADMIN_ROUTES } from 'containers/App/routes';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectCurrentUser,
  makeSelectUser,
} from '../../containers/App/selectors';

const SideBarAdmin = props => {
  const { classes, showSideBar, onToggleSideBar, currentUser, user } = props;

  const toggleDrawer = value => {
    if (!onToggleSideBar) {
      onToggleSideBar(value);
    }
  };

  // console.log('currentUser', currentUser.role);
  // console.log('user', user);

  const renderList = () => {
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component="div">
          {ADMIN_ROUTES.map(item => {
            //if (item.show !== 0 && item.roles === currentUser.role) {
            if (item.show !== 0) {
              return (
                <NavLink
                  to={item.layout + item.path}
                  exact={item.exact}
                  className={classes.menuLink}
                  activeClassName={classes.menuLinkActive}
                  key={item.path}
                >
                  <ListItem className={classes.menuList} button>
                    <item.icon className={classes.icon} />
                    {item.name}
                  </ListItem>
                </NavLink>
              );
            }
            return null;
          })}
        </List>
      </div>
    );
    return xhtml;
  };

  return (
    <Drawer
      open={showSideBar}
      onClose={toggleDrawer(false)}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="persistent"
    >
      {renderList()}
    </Drawer>
  );
};

SideBarAdmin.propTypes = {
  showSideBar: PropTypes.bool,
  onToggleSideBar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withStyles(styles),
  withConnect,
  memo,
)(SideBarAdmin);

//export default withStyles(styles)(SideBarAdmin);
