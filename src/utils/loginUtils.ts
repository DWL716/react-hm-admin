import store from '../store';
import LocalStore from './LocalStore';
import {loginAction} from '../store/reducers/login/action'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // 3 获取用户是否登录
  getUserState () {
    // 因为有些项目 ，有些是在这里处理， 有些是在别的页面处理。
    // eg： 加入，某个项目，先登录--->选择城市---> 其他选择
    // 写一下获取的逻辑，但是实际项目中 用不用，根据小伙伴们的实际需求
    // 判断用户是否登录
    const storeState = store.getState().login.isLogin;
    // 如果登陆了，就返回true，页面就会响应这个值，去获取用户信息。
    if( storeState ) return true;

    //如果没有登录，就去验证本地的token信息 如果有token 就说明已经登陆了。但是状态还是未改变，
    // const localToken = LocalStore.get(TokenKey);
    // if( localToken ) {
    //   store.dispatch( loginAction() );

    //   return true;
    // }
    
  },
}