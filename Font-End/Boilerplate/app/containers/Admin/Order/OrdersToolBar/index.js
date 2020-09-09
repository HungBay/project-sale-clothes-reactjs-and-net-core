import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Paper, Input } from '@material-ui/core';
import SearchInput from 'components/SearchInput';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    padding: theme.spacing(1),
  },
}));

const OrdersToolBar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKeyword(keyword);
  }, [keyword]);

  const onHandleChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    setKeyword(value);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row} />
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search order"
          onChange={onHandleChange}
          value={keyword}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const { onSearchOrder } = props;
              onSearchOrder(keyword);
            }
          }}
        />
        <span className={classes.spacer} />
        <Button className={classes.exportButton}>Export</Button>
        {/* <Paper className={clsx(classes.root, className)}>
          <SearchIcon className={classes.icon} />
          <Input
            className={classes.input}
            disableUnderline
            //onChange={onChange}
          />
        </Paper> */}
      </div>
    </div>
  );
};

OrdersToolBar.propTypes = {
  className: PropTypes.string,
  onSearchOrder: PropTypes.func,
};

export default OrdersToolBar;
