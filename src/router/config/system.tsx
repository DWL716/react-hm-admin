import React from 'react'
import Loadable from 'react-loadable';

import {
  DashboardOutlined,
} from '@ant-design/icons';

import loadings from '../loadings';
import System from '../../pages/system'
import User from '../../pages/system/user'
const system = [
  {
    component: User,
    icon: <DashboardOutlined />,
    name: '用户管理',
    path: '/user',
  },
  {
    component: System,
    icon: <DashboardOutlined />,
    name: '角色管理',
    path: '/role',
  },
  {
    component: System,
    icon: <DashboardOutlined />,
    name: '菜单管理',
    path: '/menu',
  },
  {
    component: System,
    icon: <DashboardOutlined />,
    name: '部门管理',
    path: '/dept',
  },
  {
    // 404
    component: Loadable({
      loader: () => import('../../components/not-found/NotFound'),
      ...loadings,
    }),
  },
]


export default system