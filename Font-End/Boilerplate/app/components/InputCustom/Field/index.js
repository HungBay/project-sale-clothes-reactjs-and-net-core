import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    inputProps={{
      style: { fontSize: 14, lineHeight: 1.2, },
    }}
    InputLabelProps={{ style: { fontSize: 14 } }}
  />
);
renderTextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default renderTextField;
