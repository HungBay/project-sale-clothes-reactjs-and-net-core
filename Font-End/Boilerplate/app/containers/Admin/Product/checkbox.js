import React from 'react';
import { Checkbox } from '@material-ui/core';

function checkbox(props) {
  const { onChange, category } = props;
  const handleCheck = (event, isInputChecked) => {
    onChange(event, isInputChecked, category);
  };

  return (
    <div>
      <Checkbox
        label={category}
        iconStyle={{ fill: '#000' }}
        value={category}
        onCheck={handleCheck}
      />
      {category}
    </div>
  );
}

export default checkbox;
