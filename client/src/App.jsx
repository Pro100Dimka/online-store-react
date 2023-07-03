import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { useContext, useEffect, useState } from 'react';
import { checkLogin } from './components/apiHelper/userApi';
import { enqueueSnackbar } from 'notistack';

const App = observer(() => {
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    checkLogin()
      .then((response) => {
        user.setUser(response);
        user.setIsAuth(true);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
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
