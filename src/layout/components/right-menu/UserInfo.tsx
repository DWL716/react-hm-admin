/***
 * @auth: hm
 * @time: 
 * @func:
 * @params:
 * @return:
 * @updateTime:
 ***/
import React, {memo, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import {
  Dropdown,
  Menu, message,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import {setDrawer} from '../../../store/reducers/layout/action'
import loginUtils from '../../../utils/loginUtils'
import {logOut} from '../../../http/user'

interface IProps {

}

const { Item } = Menu;
const UserInfo: React.FC<IProps> = (props) => {

  const dispatch = useDispatch()
  const handleSystemSettingsClick = useCallback(() => {
    dispatch(setDrawer(true))
  }, [dispatch]);
  // 退出登陆
  const outLoginClick = useCallback(() => {
    logOut()
    loginUtils.deleteLoginState()
  }, [])

  const userMenu = (
    <Menu>
      <Item onClick={() => message.info('你点击了修改密码')}>修改密码</Item>
      <Item onClick={handleSystemSettingsClick}>系统设置</Item>
      <Item onClick={() => message.info('你点击了清除缓存')}>清除缓存</Item>
      <Item onClick={outLoginClick}>退出登录</Item>
    </Menu>
  );

  return (
    <div className="user">
      <Dropdown
        overlay={userMenu}
        trigger={['hover']}
      >
        <span className="name">
          超级管理员
          <CaretDownOutlined />
        </span>
      </Dropdown>
    </div>
  );
};

export default memo(UserInfo);