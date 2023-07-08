import { login, registration } from '../../../components/apiHelper/userApi';
import { SHOP_ROUTE } from '../../../utils/consts';

const submit = async (values, isLogin, enqueueSnackbar, user, navigate) => {
  const { email, password, name, surname, phone } = values;
  if (isLogin)
    await login(email, password)
      .then((response) => {
        user.setIsAuth(true);
        user.setUser(response);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      })
      .finally(() => navigate(SHOP_ROUTE));
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
