import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import AppRouter from './components/router';
import NavBar from './components/NavBar';
import { Context } from './index';
import { checkLogin } from './components/apiHelper/userApi';
import ApiService from './components/apiHelper/apiDevice';
import { BRAND_ROUTE, DEVICE_ROUTE, TYPE_ROUTE } from './utils/consts';

const App = observer(() => {
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const { device } = useContext(Context);
  const apiTypes = new ApiService(TYPE_ROUTE);
  const apiBrands = new ApiService(BRAND_ROUTE);
  const apiDevice = new ApiService(DEVICE_ROUTE);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const promises = [apiTypes.getAllItems(), apiBrands.getAllItems(), apiDevice.getAllItems()];
    Promise.all(promises)
      .then(([types, brands, devices]) => {
        device.setStoreItems(TYPE_ROUTE, types);
        device.setStoreItems(BRAND_ROUTE, brands);
        device.setStoreItems(DEVICE_ROUTE, devices);
      })
      .catch((error) => {
        const err = error.response?.data?.message || error;
        enqueueSnackbar(err, { variant: 'error' });
      });
  }, []);
  useEffect(() => {
    checkLogin()
      .then((response) => {
        user.setUser(response);
        user.setIsAuth(true);
      })
      .catch(() => {
        if (localStorage.getItem('token')) localStorage.removeItem('token');
      })
      .finally(() => setIsLoading(false));
  }, []);
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
