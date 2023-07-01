import { login, registration } from '../../../components/apiHelper/userApi';
const submit = async (values, isLogin) => {
  const { email, password, name, surname, phone } = values;
  let responce;
  if (isLogin) responce = await login();
  else responce = await registration(email, password, name, surname, phone);
  console.log(responce);
};
export default submit;
