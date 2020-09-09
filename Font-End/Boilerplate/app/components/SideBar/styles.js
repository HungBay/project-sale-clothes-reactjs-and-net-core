const styles = theme => ({
  drawerPaper: {
    width: 240,
    maxWidth: 190,
    height: '100%',
    position: 'relative',
    zIndex: 10,
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.color.defaultColor,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: theme.color.hover,
    },
  },
});

export default styles;
