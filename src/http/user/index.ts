import http from '../request';

interface ILogin {
  username: string;
  password: string;
}

// 登录
export const login = (options: ILogin) => http.post('/login', options);

// 刷新token
export const refreshToken = (authToken: string) => http.put('/auth/tokens', {refreshToken});