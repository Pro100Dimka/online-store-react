import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, adminRoutes } from './Routes';
import { SHOP_ROUTE } from '../../utils/consts';
import { Context } from '../..';

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  const { role } = user.getUser();
  return (
    <Routes>
      {user._isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {role === 'ADMIN' &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;
