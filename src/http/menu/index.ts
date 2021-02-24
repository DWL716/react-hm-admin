import http from '../request';
import { versions } from "../config";

// interface IMenu {
//   useId: number
// }
// 权限 menu
export const menu = () => http.get(`${versions}/user/getUserMenu`);