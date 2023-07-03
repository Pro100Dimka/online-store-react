import { login, registration } from '../../../components/apiHelper/userApi';
import { SHOP_ROUTE } from '../../../utils/consts';

const submit = async (
  values,
  isLogin,
  enqueueSnackbar,
  authApi,
  user,
  navigate
) => {
  const { email, password, name, surname, phone } = values;
  if (isLogin)
    await login(email, password)
      .then((response) => {
        user.setIsAuth(true);
        user.setUser(response);
        navigate(SHOP_ROUTE);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      });
  // authApi.createItem(values).then((response) => {
  //   console.log('response', response);
  // });
  else
    await registration(email, password, name, surname, phone)
      .then((response) => {
        user.setIsAuth(true);
        user.setUser(response);
        navigate(SHOP_ROUTE);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      });
};
export default submit;
