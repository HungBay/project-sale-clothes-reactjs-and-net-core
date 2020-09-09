import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  color: {
    primary: '#D32F2F',
    secondary: '#00BCD4',
    error: '#E64A19',
    color: 'white',
    defaultColor: '#000000',
    hover: 'rgba(0,0,0,0.2)',
    textColor: '#ffffff',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 4,
    background: '#7B1FA2',
    textColor: '#FFFFFF',
    borderColor: '#ccc',
  },
});

export default theme;
