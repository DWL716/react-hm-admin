const devBaseURL: string = "http://172.18.100.102:8090";
const proBaseURL: string = "http://172.18.100.104:8090";

// version 为接口的版本
export const versions: string = '/api/v1'

// 请求接口的开发环境
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

// 请求超时时间
export const TIMEOUT = 5000;