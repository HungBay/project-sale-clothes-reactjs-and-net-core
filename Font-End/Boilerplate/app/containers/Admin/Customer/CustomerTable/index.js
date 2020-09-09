import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { Link as routerLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

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
    fontSize: 18,
  },
}));

const CustomerTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={
        //   <Button color="primary" size="small" variant="outlined">
        //     New entry
        //   </Button>
        // }
        title="Danh sách khách hàng"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablecell}>#</TableCell>
                  <TableCell className={classes.tablecell}>Tên</TableCell>
                  <TableCell className={classes.tablecell} sortDirection="desc">
                    Địa chỉ
                  </TableCell>
                  <TableCell className={classes.tablecell} sortDirection="desc">
                    Email
                  </TableCell>
                  <TableCell className={classes.tablecell} sortDirection="desc">
                    Số điện thoại
                  </TableCell>
                  {/* <TableCell>Status</TableCell> */}
                  <TableCell className={classes.tablecell}>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.order}>
                {users.splice(0, 5).map((user, key) => (
                  <TableRow hover key={key}>
                    <TableCell className={classes.tablecell}>
                      {key + 1}
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/employ-order/${user.id}/detail`}
                      component={routerLink}
                    >
                      {user.lastName + ' ' + user.firstName}
                      <Fab
                        component="span"
                        size="large"
                        className={classes.button}
                      >
                        <Avatar
                          className={classes.avatar}
                          src={
                            user
                              ? `data:image/jpeg;base64,${user.imageUser}`
                              : ''
                          }
                        />
                      </Fab>
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/employ-order/${user.id}/detail`}
                      component={routerLink}
                    >
                      {user.address}
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                      {user.email}
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                      {user.phone}
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                      {/* {moment(product.createdAt).format('DD/MM/YYYY')} */}

                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          // onClick={() => handleEdit(user.id)}
                          to={`/admin/employee-edit/${user.id}/edit`}
                          component={routerLink}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          //onClick={() => handleDelete(user.id)}
                        >
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

CustomerTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
};

// const mapStateToProps = createStructuredSelector({});

// function mapDispatchToProps(dispatch) {
//   return {};
// }

const withConnect = connect(
  null,
  null,
);
export default compose(
  withConnect,
  memo,
)(CustomerTable);
