import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from './Routes';
import { SHOP_ROUTE } from '../../utils/consts';
import { Context } from '../..';

function AppRouter() {
  const { user } = useContext(Context);
  console.log();
  return (
    <Routes>
      {user._isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
