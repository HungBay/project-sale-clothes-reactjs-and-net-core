const styles = (theme) => ({
  wapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  wapperContent: {
    width: '100%',
    padding: 10,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  shiftLeft: {
    marginLeft: -190,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

export default styles;
