import React, { memo } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { Redirect } from 'react-router-dom';

import loginUtils from '../utils/loginUtils';

interface IProps extends RouteConfigComponentProps{
}
const Auth: React.FC<IProps> = (props) => {
  const { route, location } = props;
  const isLogin = loginUtils.getUserState();
  console.log(route);
  
  // 需要处理 判断路由
  // 如果没有登录，且不在登陆页
  if( !isLogin && location.pathname !== '/login' ) return  <Redirect to='/login' />
  // 已经登录 是否还在登录页
  if( isLogin && location.pathname === '/login' ) return <Redirect to='/' />
  return (
    <>
      {
        route && route.routes && renderRoutes( route.routes )
      }
    </>
  )
}


export default memo(Auth)