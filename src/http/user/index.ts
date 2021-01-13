import http from "../request";
import { ParsedUrlQueryInput } from "querystring";
// import { versions } from "../config";

interface ILogin extends ParsedUrlQueryInput {
  username: string;
  password: string;
}
// api/v1/user/
// 登录
// const formData = new FormData();
// Object.keys(params).forEach((key) => {
//   formData.append(key, params[key]);
// });

export const login = (options: ILogin) => http.post(`/user/login`, options);
export const logOut = () => http.get(`/logout`);

// 刷新token
// export const refreshToken = () =>
//   http.get(`${versions}/user/getUserMenu`);
