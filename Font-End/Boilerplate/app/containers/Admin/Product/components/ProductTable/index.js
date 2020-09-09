import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
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
import React, { useState } from 'react';
//import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as routerLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  // actions: {
  //   justifyContent: 'flex-end',
  // },
  tableRow: {
    cursor: 'pointer',
    textDecoration: 'none',
    wordWrap: 'break-word',
  },
  tablecell: {
    textDecoration: 'none',
  },
}));

const ProductsTable = props => {
  const { className, products, loading, onDeleteProduct, ...rest } = props;
  const classes = useStyles();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { products } = props;

    let selectedProducts;

    if (event.target.checked) {
      selectedProducts = products.map(product => product.id);
    } else {
      selectedProducts = [];
    }

    setSelectedProducts(selectedProducts);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProducts.indexOf(id);
    let newSelectedProducts = [];

    if (selectedIndex === -1) {
      newSelectedProducts = newSelectedProducts.concat(selectedProducts, id);
    } else if (selectedIndex === 0) {
      newSelectedProducts = newSelectedProducts.concat(
        selectedProducts.slice(1),
      );
    } else if (selectedIndex === selectedProducts.length - 1) {
      newSelectedProducts = newSelectedProducts.concat(
        selectedProducts.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedProducts = newSelectedProducts.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1),
      );
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={
        //   <Button color="primary" size="small" variant="outlined">
        //     New entry
        //   </Button>
        // }
        title="Bảng sản phẩm"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Tên
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Hình ảnh
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Mô tả
                  </TableCell>
                  {/* <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Mô tả
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell> */}

                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.order}>
                {products.slice(0, rowsPerPage).map((product, key) => (
                  <TableRow hover key={key}>
                    <TableCell
                      style={{
                        width: '5%',
                      }}
                    >
                      {key + 1}
                    </TableCell>

                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/product/${product.id}/detail`}
                      component={routerLink}
                      style={{
                        width: '20%',
                        fontSize: '18px',
                      }}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      to={`/admin/product/${product.id}/detail`}
                      component={routerLink}
                      style={{
                        width: '20%',
                      }}
                    >
                      <CardMedia
                        className={classes.card}
                        component="img"
                        height="240"
                        image={
                          product
                            ? `data:image/jpeg;base64,${product.image}`
                            : ''
                        }
                        alt={product.name}
                        title="Contemplative Reptile"
                      />
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      // to={`/admin/product/${product.id}/detail`}
                      // component={routerLink}
                      style={{
                        width: '32%',
                        fontSize: '18px',
                      }}
                    >
                      {product ? product.description : ''}
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      style={{
                        width: '10%',
                      }}
                      // to={`/admin/product/${product.id}/detail`}
                      // component={routerLink}
                    >
                      <p
                        style={{
                          backgroundColor: product
                            ? product.status === 0
                              ? '#5393ff'
                              : '#5393ff'
                            : '',
                          borderRadius: 10,
                          color: 'white',
                          textAlign: 'center',
                        }}
                      >
                        {product
                          ? product.status === 0
                            ? 'Ẩn'
                            : 'Hiển thị'
                          : ''}
                      </p>
                    </TableCell>

                    <TableCell
                      style={{
                        width: '18%',
                      }}
                    >
                      {/* {moment(product.createdAt).format('DD/MM/YYYY')} */}
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="update"
                          to={`/admin/product-update/${product.id}`}
                          component={routerLink}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                          <DeleteIcon
                            onClick={() => onDeleteProduct(product)}
                          />
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

ProductsTable.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired,
  onDeleteProduct: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onDeleteProduct: id => {
      console.log(id);
    },
  };
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ProductsTable);
