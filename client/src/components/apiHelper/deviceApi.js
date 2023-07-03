import { $host, $authHost } from './http';
import jwt_decode from 'jwt-decode';

export const getDevice = async (email, password) => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};
export const createDevice = async () => {
  const { data } = await $authHost.get('api/user/auth');
  return jwt_decode(data.token);
};
