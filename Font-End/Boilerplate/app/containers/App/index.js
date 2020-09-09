/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import GlobalLoading from 'components/Loading';
import AccountAdmin from 'containers/Admin/Account';
import CategoryAdmin from 'containers/Admin/Category';
import CreateCategory from 'containers/Admin/Category/CategoryCreate';
import UpdateCategory from 'containers/Admin/Category/CategoryUpdate';
import Dashboard from 'containers/Admin/Dashboard';
import SignIn from 'containers/Admin/Login/SignIn/index';
import SignUp from 'containers/Admin/Login/SignUp/index';
import OrdersAdmin from 'containers/Admin/Order';
import OrderDetailAdmin from 'containers/Admin/Order/OrderDetail';
import EmployOrderAdmin from 'containers/Admin/User/EmployOrderView';
import OrderUpdateAdmin from 'containers/Admin/Order/OrderUpdate';
import ProductAdmin from 'containers/Admin/Product';
import ProductAddAdmin from 'containers/Admin/Product/add';
import ProductUpdate from 'containers/Admin/Product/update';
import EmployeeAdmin from 'containers/Admin/User';
import UserEditAdmin from 'containers/Admin/User/UserEdit';
import CustomerAdmin from 'containers/Admin/Customer';
import CartBootstrap from 'containers/HomeBootstrap/Cart';
import CheckOutBootstrap from 'containers/HomeBootstrap/Checkout';
import DashboardBootstrap from 'containers/HomeBootstrap/HomePage';
import OrdersBootstrap from 'containers/HomeBootstrap/Orders';
import OrderDetailBootstrap from 'containers/HomeBootstrap/Orders/OrderDetail';
import ProductBootstrap from 'containers/HomeBootstrap/Product';
import ProductsBootstrap from 'containers/HomeBootstrap/Products';
import ProfileBootstrap from 'containers/HomeBootstrap/Profile';
import SignInHomePage from 'containers/Login/SignIn';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Switch } from 'react-router-dom';
import GlobalStyle from '../../global-styles';
import ProductDetail from '../Admin/Product/detail';
import DefaultLayout from './DefaultLayout';
import LayoutHomeBootstrap from './LayoutHomeBootstrap';
import LayoutHomeBootstrap1 from './LayoutHomeBootstrap1';
import LayoutSharedNoSideBarCustomer from './LayoutSharedNoSideBarCustomer';
import RouteWithLayout from './RouteWithLayout';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s" defaultTitle="Bán quần áo">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>

      <Switch>
        <DefaultLayout path="/admin/signin" component={SignInHomePage} />
        <DefaultLayout path="/admin/login" component={SignIn} />
        <DefaultLayout path="/login" component={SignIn} />
        <DefaultLayout path="/dang-ky" component={SignUp} />
        {/* <DefaultLayout path="/admin/login" component={LoginAdmin} /> */}
        <Redirect exact from="/admin" to="/admin/dashboard" />
        <RouteWithLayout
          path="/admin/dashboard"
          name="Trang chủ"
          component={Dashboard}
        />
        <RouteWithLayout
          path="/admin/products"
          name="Trang chủ"
          component={ProductAdmin}
        />
        <RouteWithLayout
          path="/admin/product/:id/detail"
          name="Trang chủ"
          component={ProductDetail}
        />
        <RouteWithLayout
          path="/admin/product-update/:id"
          name="Trang cập nhật sản phẩm"
          component={ProductUpdate}
        />
        <RouteWithLayout
          path="/admin/product/add"
          name="Thêm sản phẩm"
          component={ProductAddAdmin}
        />
        <RouteWithLayout
          path="/admin/category"
          name="Danh mục"
          component={CategoryAdmin}
        />
        <RouteWithLayout
          path="/admin/employees"
          name="Employee"
          component={EmployeeAdmin}
        />
        <RouteWithLayout
          path="/admin/users"
          name="User"
          component={CustomerAdmin}
        />
        <RouteWithLayout
          path="/admin/employee-edit/:id/edit"
          name="Employee"
          component={UserEditAdmin}
        />
        <RouteWithLayout
          path="/admin/account"
          name="Account"
          component={AccountAdmin}
        />
        <RouteWithLayout
          path="/admin/orders"
          name="Orders"
          component={OrdersAdmin}
        />
        <RouteWithLayout
          path="/admin/order/:id/detail"
          name="Order details"
          component={OrderDetailAdmin}
        />
        <RouteWithLayout
          path="/admin/employ-order/:id/detail"
          name="Order details"
          component={EmployOrderAdmin}
        />
        <RouteWithLayout
          path="/admin/order-update/:id/upadte"
          name="Order Update"
          component={OrderUpdateAdmin}
        />
        <RouteWithLayout
          path="/admin/category-update/:id"
          name="Update"
          component={UpdateCategory}
        />
        <RouteWithLayout
          path="/admin/category-add"
          name="Create"
          component={CreateCategory}
        />
        {/* <LayoutSharedAdmin path="/admin/user" component={UserAdmin} /> */}
        <Redirect exact from="/" to="/dashboard" />
        <Redirect exact from="/home" to="/dashboard" />
        {/* <LayoutSharedCustomer path="/home/dashboard" component={HomePage} /> */}
        {/* <LayoutUser path="/home/dashboard" component={HomePage} />
        <LayoutUser path="/home/carts" component={Cart} />
        <LayoutUser
          path="/home/products/:id/colection"
          component={ProductsHomePage}
        /> */}

        {/* <LayoutUser
          path="/home/product/:id/detail"
          component={ProductDetailHomePage}
        /> */}
        {/* <LayoutSharedNoSideBarCustomer path="/home/carts" component={Cart} /> */}
        {/* <LayoutUser2 path="/home/orders" component={Orders} />
        <LayoutUser2 path="/home/profile" component={Profile} /> */}
        {/* <LayoutSharedNoSideBarCustomer path="/checkout" component={Checkout} /> */}
        <LayoutHomeBootstrap path="/dashboard" component={DashboardBootstrap} />
        <LayoutHomeBootstrap
          path="/products/:id/:slug"
          component={ProductsBootstrap}
        />
        <LayoutHomeBootstrap
          path="/product/:id/view"
          component={ProductBootstrap}
        />
        <LayoutHomeBootstrap1 path="/cart" component={CartBootstrap} />
        <LayoutHomeBootstrap1 path="/profile" component={ProfileBootstrap} />
        <LayoutHomeBootstrap1 path="/checkout" component={CheckOutBootstrap} />
        <LayoutHomeBootstrap1 path="/orders" component={OrdersBootstrap} />
        <LayoutHomeBootstrap1
          path="/order/:id/view"
          component={OrderDetailBootstrap}
        />

        {/* <LayoutSharedNoSideBarCustomer path="" component={NotFound} /> */}
      </Switch>
      <GlobalLoading />
      <GlobalStyle />
    </div>
  );
}
