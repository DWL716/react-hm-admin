import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import koKR from 'antd/lib/locale/ko_KR';
// import moment from 'moment';
// import 'moment/locale/zh-cn';

import config from './router/config'
import LocalStore from './utils/LocalStore';

// moment.locale('en');
const ROUTE_BASE_NAME = process.env.PUBLIC_URL || '';
const BASE_NAME = ROUTE_BASE_NAME ? ROUTE_BASE_NAME.replace('/', '') : '';
const OLD_LESS_ID = `less:${BASE_NAME ? BASE_NAME + '-' : ''}color:old`;

function App() {
  // 只需要页面首次加载的时候，执行一次即可。所以千万不要添加依赖项
  let isLang: any = null
  const { language } = useSelector((state: any) => state.layout);
  switch (language) {
    case "zh_CN":
      isLang = zhCN;
      break;
    case "en_US":
      isLang = enUS;
      break;
    case "ko_KR":
      isLang = koKR;
      break;
    default:
      break;
  }
  useEffect(() => {
    // 快速生效的办法
    const themeStyleContent = LocalStore.get('theme-style-content');
    if (themeStyleContent) {
      const themeStyle = document.createElement('style');
      themeStyle.id = OLD_LESS_ID;
      themeStyle.innerHTML = themeStyleContent;
      document.body.insertBefore(themeStyle, document.body.firstChild);
    }

  }, []);
  return (
    <ConfigProvider locale={isLang}>
      <BrowserRouter>
        {renderRoutes(config)}
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
