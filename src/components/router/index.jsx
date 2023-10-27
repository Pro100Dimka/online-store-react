import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, adminRoutes } from './Routes';
import { SHOP_ROUTE } from '../../utils/consts';
import { Context } from '../..';

function AppRouter() {
  const { user } = useContext(Context);
  const { role } = user.getUser();
  // const [isAuth, setIsauth] = useState(null);
  // const [role, setRole] = useState(null);
  // useEffect(() => {
  //   setIsauth(user.getIsAuth());
  //   setRole(user.getUser().role);
  // }, [user._isAuth]);
  return (
    <Routes>
      {user._isAuth
        && authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {role === 'ADMIN'
        && adminRoutes.map(({ path, Component }) => (
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
