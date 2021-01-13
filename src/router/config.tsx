import React from 'react';
import Loadable from 'react-loadable';

import {
  DashboardOutlined,
} from '@ant-design/icons';

import RouteWithSubRouters from './RouteWithSubRouters';
import Auth from './Auth';
import loadings from './loadings';
import Layout from '../layout'
import system from './config/system'

const router = [
  {
    component: Auth,
    routes: [
      // 1级级路由
      {
        path: '/login',
        component: Loadable({
          loader: () => import('../pages/login'),
          ...loadings,
        }),
      }, {
        // 404
        path: '/404',
        component: Loadable({
          loader: () => import('../components/not-found/NotFound'),
          ...loadings,
        }),
      }, {
        // home
        path: '/home',
        component: Loadable({
          loader: () => import('../pages/home'),
          ...loadings,
        }),
      }, {
        path: '/',
        component: Layout,
        routes: [
          {
            // 1级级路由
            component: RouteWithSubRouters,
            icon: <DashboardOutlined />,
            name: '系统管理',
            path: '/system',
            routes: system
          },
          {
            // 1级级路由
            component: RouteWithSubRouters,
            icon: <DashboardOutlined />,
            name: '系统监控',
            path: '/monitor',
          },
          {
            // 1级级路由
            component: RouteWithSubRouters,
            icon: <DashboardOutlined />,
            name: '系统工具',
            path: '/tool',
          },
          {
            // 404
            component: Loadable({
              loader: () => import('../components/not-found/NotFound'),
              ...loadings,
            }),
          },
        ]
      }, {
        // 404
        component: Loadable({
          loader: () => import('../components/not-found/NotFound'),
          ...loadings,
        }),
      },
    ]
  }
]

export default router