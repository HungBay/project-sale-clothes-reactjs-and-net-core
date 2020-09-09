import { withStyles } from '@material-ui/core';
import _without from 'lodash/without';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';

class ArrayCheckbox extends Component {
  onChange(event) {
    const { input, itemValue } = this.props;

    var oldValues = input.value || [];

    var newValues = _without(oldValues, itemValue); // remove value

    if (event.target.checked) {
      // was checked
      newValues = oldValues.concat(itemValue);
    }

    input.onChange(newValues);
  }

  render() {
    const { input, itemValue, initialValue, classes } = this.props;
    return (
      <label className={classes.label}>
        <input
          type="checkbox"
          checked={input.value.indexOf(itemValue) >= 0}
          onChange={this.onChange.bind(this)}
          className={classes.checkbox}
        />
        {initialValue}
      </label>
    );
  }
}

ArrayCheckbox.propTypes = {
  input: PropTypes.object,
  itemValue: PropTypes.string,
  initialValue: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(ArrayCheckbox);
