// import React from 'react';
import Loadable from 'react-loadable';

import Auth from './Auth'
import loadings from './loadings';

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
        path: '/',
        component: Loadable({
          loader: () => import('../pages/home'),
          ...loadings
        })
      }
    ]
  }
]

export default router