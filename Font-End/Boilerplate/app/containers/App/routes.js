import HomeIcon from '@material-ui/icons/Home';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks';
import CategoryIcon from '@material-ui/icons/LibraryBooks';
import Dashboard from 'containers/Admin/Dashboard';
import Product from 'containers/Admin/Product/index';
import Category from 'containers/Admin/Category/index';
import Order from 'containers/Admin/Order/index';
import CustomerAdmin from 'containers/Admin/Customer';
import Employee from 'containers/Admin/User/index';
import IconShoppingCart from '@material-ui/icons/ShoppingCart';
import Account from 'containers/Admin/Account/index';
import IconPeople from '@material-ui/icons/People';
import Statistical from 'containers/Admin/Statistical/index';
import IconStatistical from '@material-ui/icons/PrintSharp';

export const ADMIN_ROUTES = [
  {
    path: '/dashboard',
    name: 'Trang quản trị',
    exact: true,
    component: Dashboard,
    icon: HomeIcon,
    layout: '/admin',
    show: 1,
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   exact: false,
  //   icon: UserIcon,
  //   layout: '/admin',
  //   show: 1,
  // },
  {
    path: '/products',
    name: 'Quản lý sản phẩm',
    exact: false,
    component: Product,
    icon: IconLibraryBooks,
    layout: '/admin',
    show: 1,
  },
  {
    path: '/users',
    name: 'Quản lý khách hàng',
    component: CustomerAdmin,
    exact: false,
    icon: IconPeople,
    layout: '/admin',
    show: 1,
  },
  {
    path: '/employees',
    name: 'Quản lý nhân viên',
    component: Employee,
    exact: false,
    icon: IconPeople,
    layout: '/admin',
    show: 1,
  },
  // {
  //   path: '/account',
  //   name: 'Profile',
  //   component: Account,
  //   exact: false,
  //   icon: IconPeople,
  //   layout: '/admin',
  //   show: 1,
  // },
  {
    path: '/category',
    name: 'Danh mục',
    component: Category,
    exact: false,
    icon: CategoryIcon,
    layout: '/admin',
    show: 1,
  },
  {
    path: '/orders',
    name: 'Order',
    component: Order,
    exact: false,
    icon: IconShoppingCart,
    layout: '/admin',
    show: 1,
  },
  {
    path: '/statistical',
    name: 'Statistical',
    component: Statistical,
    exact: false,
    icon: IconStatistical,
    layout: '/admin',
    show: 1,
  },
  // {
  //   path: '/product/:id/detail',
  //   name: 'product',
  //   component: ProductDetail,
  //   exact: false,
  //   icon: IconLibraryBooks,
  //   layout: '/admin',
  //   show: 0,
  // }
];

export const EMPLOYEE_ROUTES = [
  {
    path: '/dashboard',
    name: 'Trang quản trị',
    exact: true,
    component: Dashboard,
    icon: HomeIcon,
    layout: '/admin',
    show: 1,
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   exact: false,
  //   icon: UserIcon,
  //   layout: '/admin',
  //   show: 1,
  // },
  {
    path: '/products',
    name: 'Quản lý sản phẩm',
    exact: false,
    component: Product,
    icon: IconLibraryBooks,
    layout: '/admin',
    show: 1,
  },
  {
    path: '/users',
    name: 'Quản lý khách hàng',
    component: CustomerAdmin,
    exact: false,
    icon: IconPeople,
    layout: '/admin',
    show: 1,
  },
  {
    path: '/employees',
    name: 'Quản lý nhân viên',
    component: Employee,
    exact: false,
    icon: IconPeople,
    layout: '/admin',
    show: 0,
  },
  // {
  //   path: '/account',
  //   name: 'Profile',
  //   component: Account,
  //   exact: false,
  //   icon: IconPeople,
  //   layout: '/admin',
  //   show: 1,
  // },
  {
    path: '/category',
    name: 'Danh mục',
    component: Category,
    exact: false,
    icon: CategoryIcon,
    layout: '/admin',
    show: 0,
  },
  {
    path: '/orders',
    name: 'Order',
    component: Order,
    exact: false,
    icon: IconShoppingCart,
    layout: '/admin',
    show: 1,
  },
  {
    path: '/statistical',
    name: 'Statistical',
    component: Statistical,
    exact: false,
    icon: IconStatistical,
    layout: '/admin',
    show: 1,
  },
  // {
  //   path: '/product/:id/detail',
  //   name: 'product',
  //   component: ProductDetail,
  //   exact: false,
  //   icon: IconLibraryBooks,
  //   layout: '/admin',
  //   show: 0,
  // }
];
