import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { Link as routerLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  // status: {
  //   marginRight: theme.spacing(1),
  // },
  actions: {
    justifyContent: 'flex-end',
  },
  status: {
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 300,
    fontFamily: 'arial',
    color: 'white',
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  order: {
    cursor: 'pointer',
  },
  tablecell: {
    textDecoration: 'none',
  },
}));

const OrdersTable = props => {
  const { className, categories, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={
        //   <Button color="primary" size="small" variant="outlined">
        //     New entry
        //   </Button>
        // }
        title="Danh mục"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Tên danh mục</TableCell>
                  {/* <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell> */}
                  {/* <TableCell>Trạng thái</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.order}>
                {categories.splice(0, 5).map((category, key) => (
                  <TableRow hover key={key}>
                    <TableCell className={classes.tablecell}>{key}</TableCell>
                    <TableCell className={classes.tablecell}>
                      {category.name}
                    </TableCell>
                    <TableCell>
                      {/* {moment(product.createdAt).format('DD/MM/YYYY')} */}
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="update"
                          to={`/admin/category-update/${category.id}`}
                          component={routerLink}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

OrdersTable.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(OrdersTable);
