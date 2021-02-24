import http from '../../request';
import { versions } from "../../config";

// 添加用户
export const userAdd = (userName: string, phonenumber: string, sex: string, password: string) => http.post(`${versions}/user/add`, {userName, phonenumber, sex, password})