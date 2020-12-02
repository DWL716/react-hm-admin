import store from '../store';
import LocalStore from './LocalStore';
import {loginAction, loginOut} from '../store/reducers/login/action'
import { refreshToken } from '../http/user'

const TokenKey = 'BLOG_JWT::token';
const TokenDate = 'BLOG_JWT::date';
let isRefreshing = false;

const loginUtils = {
  saveLoginState (token: string) {
    LocalStore.set(TokenKey, token);
    // 过期时间处理 24小时后过期
    LocalStore.set(TokenDate, new Date().getTime() + 1860000);
  },
  // 2 退出登录删除用户信息
  deleteLoginState() {
    // 先从本地存储中删除数据
    LocalStore.remove(TokenKey);
    LocalStore.remove(TokenDate);
    // 退出登录
    store.dispatch(loginOut());
    // 处理页面路由
    if( window.location.pathname !== '/login' ) window.location.href = '/login';
  },
  // 3 获取用户是否登录
  getUserState () {
    // 因为有些项目 ，有些是在这里处理， 有些是在别的页面处理。
    // eg： 加入，某个项目，先登录--->选择城市---> 其他选择
    // 写一下获取的逻辑，
    // 判断用户是否登录
    const storeState = store.getState().login.isLogin;
    // 如果登陆了，就返回true，页面就会响应这个值，去获取用户信息。
    if( storeState ) return true;

    //如果没有登录，就去验证本地的token信息 如果有token 就说明已经登陆了。但是状态还是未改变，
    const localToken = LocalStore.get(TokenKey);
    if( localToken ) {
      store.dispatch( loginAction() );

      return true;
    }
    
  },
  // 4 获取token和刷新token
  // 注意： 此方法是获取token/刷新token 就会跟服务器打交道，就会发起请求，
  // 说明是异步处理的。 咱们又需要让它同步执行，所以
  async getToken () {
    // 在这里面处理异步逻辑
    // 需求： 过期前30分钟刷新，
    if( isRefreshing ) return LocalStore.get(TokenKey);

    // 获取过期时间
    // 因为LocalStore获取的值是一个字符串
    const overdue = parseInt(LocalStore.get(TokenDate) || '0', 10);
    // 获取当前时间，
    const now = new Date().getTime();

    try {
      // 如果现在的时间（实际上是一个时间戳，毫秒数） 小于过期时间
      // 并且大于过期时间-约定的过期前时间 就应该去刷新token
      if( now < overdue && now > overdue - 1800000) {
        isRefreshing = true;

        const res: any = await refreshToken(LocalStore.get(TokenKey) || '');
        const token: string =  res.payload;
        this.saveLoginState( token );
        isRefreshing = false;

        return token;
      }
    } catch( error ) {
      return LocalStore.get(TokenKey);
    }

    return LocalStore.get(TokenKey);
  },
}

export default loginUtils