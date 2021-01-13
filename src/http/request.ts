import axios, { AxiosError } from 'axios'
import {message} from 'antd'
import { BASE_URL, TIMEOUT } from "./config";
import errorCode from './errorCode'
import loginUtils from '../utils/loginUtils'
import isRetryAllowed from './isRetryAllowed';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});
// instance.defaults.timeout = TIMEOUT
// instance.defaults.baseURL = BASE_URL

// 1.设置请求拦截
instance.interceptors.request.use((config) => {
  // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

  //2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
  // const isToken = (config.headers || {}).isToken === false
  
  const token = loginUtils.getToken()
  if(loginUtils.getToken() ) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
    return config
  }else {
    return config
  }
  // 3.params/data序列化的操作
  
}, error => {
  console.log(error)
  Promise.reject(error)
  throw new Error('请求拦截出错');
});

// 2.设置响应拦截
instance.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = parseInt(res.data.code) || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  if(code === 401) {
    message.error('登录状态已过期，请重新登录')
    // loginUtils.deleteLoginState()
    // window.location.href = '/login'
  }if (code === 500) {
    message.error(msg);
    return Promise.reject(new Error(msg))
  }else if (code !== 200) {
    message.error(msg)
    return Promise.reject('error')
    
  } else {
    return res.data
  }
}, (error: AxiosError) => {
  console.log('网络出错');
  // 重试的次数
  // 一般来说，生产环境10次  开发环境4次 （但不是绝对，根据自己需要）
  const retry: number = Number(process.env.REACT_APP_RETRY) || 4;
  console.log(retry, 'retry');
  
  // 请求失败时的 重试请求的间隔时间
  const retryDelay: number = 1000;
  if( !isRetryAllowed(error) ) {
    // 请求出错,走到这里的话,多半是服务器的问题
    // 先来处理多次请求失败的情况,
    const { config } = error;
    console.log(config, 'error');
    
    let retryCont = config.headers['axios-retry'] || 0;
    if( retryCont >= retry ) {
      // 告诉redux 重试次数已超过指定次数,应该修改状态, 然后组件里自动感应,变为true过后,就会提示用户
      // 提示方式有很多种,就看大家怎么定义 可以用 notification 也可以用ant-design 提供的 Alert组件
      // store.dispatch(setRetryTip(true));
      return Promise.reject(error);
    }
    retryCont += 1;
    const backOff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, retryDelay || 1);
    });

    // 修改重试次数
    config.headers['axios-retry'] = retryCont;

    // 必须要在 error中的 config 中去显示绑定才会触发执行
    return backOff.then(() => instance(config));
  }

  if( error.response ) {
    // http的状态码 非200的时候
    if( error.response.status >= 500 ) message.error('服务器错误');
  } else if( error.request ) {
    // ...
  } else {
    // 其他错误
    message.error(error.message);
  }

  return Promise.reject(error);
  // if (err && err.response) {
  //   switch (err.response.status) {
  //     case 400:
  //       console.log("请求错误");
  //       break;
  //     case 401:
  //       console.log("未授权访问");
  //       break;
  //     case 403:
  //       console.log("跨域接口问题");
  //       break;
  //     default:
  //       console.log("其他错误信息");
  //   }
  // }
  // return err;
});

export default instance;

