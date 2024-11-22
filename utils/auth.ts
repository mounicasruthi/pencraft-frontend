import jwtDecode from 'jwt-decode';

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const token = getToken();
  return token ? jwtDecode<{ id: string }>(token) : null;
};

export const clearToken = () => localStorage.removeItem('token');
