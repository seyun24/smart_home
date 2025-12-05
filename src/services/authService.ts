import usersData from '../data/users.json';

export const login = (username: string, password: string): boolean => {
  const user = usersData.users.find(
    (u) => u.username === username && u.password === password
  );
  return !!user;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const setAuthenticated = (value: boolean): void => {
  localStorage.setItem('isAuthenticated', value.toString());
};

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
};
