import http from '../../request';
import { versions } from "../../config";


// 局站 user 获取
export const getAllBranch = () => http.get(`${versions}/branch/getAllBranch`);

// 局长 添加 addBranch(parentId,name)
export const addBranch = (parentId: any,name: any) => http.post(`${versions}/branch/addBranch`, {parentId,name})