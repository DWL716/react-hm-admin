/***
 * @auth: dmx
 * @time: 2020/6/19
 * @func: 登录组件
 ***/
import React, {memo} from 'react';
import { Redirect } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import { loginActionPromise } from '../../store/reducers/login/action';
import ParticlesBg from 'particles-bg';
import LoginMain from './login-layout/LoginMain';

import './index.less';
import {useSelector} from 'react-redux';

interface IProps {

}

const Login: React.FC<IProps> = (props) => {

  const { isLogin, loading } = useSelector((state: any) => state.login );

  // 如果登陆状态为已经登陆 （ true ） 就跳转到/路径下
  if( isLogin ) return <Redirect to="/" />

  return (
    <div className="login">
      <div className="login-layout">
        <div className='login-layout-header' />
        <LoginMain
          loading={loading}
          fetch={loginActionPromise as any}
        />
        <div className='login-layout-footer' />
        <ParticlesBg
          type="lines"
          bg
        />
      </div>
    </div>
  );
};

export default memo(Login);