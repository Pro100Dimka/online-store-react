import AdminPanel from '../../pages/AdminPanel';
import Basket from '../../pages/Basket';
import Shop from '../../pages/Shop';
import Device from '../../pages/Device';
import Auth from '../../pages/Auth';

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  DEVICE_ROUTE,
} from '../../utils/consts';
export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPanel,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];
export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: Device,
  },
];
