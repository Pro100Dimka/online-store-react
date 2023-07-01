import { $host, $authHost } from './http';
import jwt_decode from 'jwt-decode';

export const registration = async (email, password, name, surname, phone) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    role: 'ADMIN',
    password,
    phone,
    name,
    surname,
  });
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  });
  return jwt_decode(data.token);
};
export const checkLogin = async (email, password) => {
  const responce = await $host.post('api/user/registration');
  return responce;
};
