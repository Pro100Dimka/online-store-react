import AdminPanel from '../../pages/AdminPages/AdminPanel';
import Basket from '../../pages/UserPages/Basket';
import ShopMainPage from '../../pages/UserPages/ShopMainPage';
import Device from '../../pages/UserPages/DeviceCard';
import Auth from '../../pages/Auth';
import DeviceList from '../../pages/AdminPages/DeviceList';
import BrandsList from '../../pages/AdminPages/BrandsList';

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  DEVICE_ROUTE,
  DEVICES_LIST,
  BRANDS_LIST,
  GITHUB_SITE,
  TYPES_LIST
} from '../../utils/consts';
import TypesList from '../../pages/AdminPages/TypesList';

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPanel
  },
  {
    path: `${ADMIN_ROUTE}${DEVICES_LIST}`,
    Component: DeviceList
  },
  {
    path: `${ADMIN_ROUTE}${BRANDS_LIST}`,
    Component: BrandsList
  },
  {
    path: `${ADMIN_ROUTE}${TYPES_LIST}`,
    Component: TypesList
  }
];

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket
  }
];
export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: ShopMainPage
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: `${GITHUB_SITE}${DEVICE_ROUTE}/:id`,
    Component: Device
  }
];
