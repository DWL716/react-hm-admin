import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux'
import { matchPath } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Layout,
  Menu,
} from 'antd';
import {
  CodepenOutlined,
  UserOutlined,
} from '@ant-design/icons';

// 声明类型
import { IMenuItem, IProps, ISidebarItem } from '../layout';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LeftTopSidebar: React.FC<IProps> = (props) => {
  const { collapsed, history, location: { pathname } } = props;
  // 菜单选中和打开配置
  const [keys, setKeys] = useState<{ currentOpenSubs: string[], currentSideMenu: string }>({
    currentSideMenu: '',
    currentOpenSubs: [],
  });

  const { theme, primaryColor } = useSelector((state: any) => state.layout)
  const { sideMenu, currentTopMenu } = useSelector((state: any) => state.menu)

  /* useEffect(() => {
    let currentOpenSubs = []
    let keysArray = pathname.split('/')
    for (let i = 1; i < keysArray.length - 1; i++) {
      currentOpenSubs.push('/' + keysArray[i])

    }
    console.log(currentOpenSubs);
    
    setKeys({
      currentSideMenu: pathname,
      currentOpenSubs,
    })
  }, [pathname, keys.currentSideMenu]); */

  // 顶部导航栏第一次进入时，默认选择左侧第一个菜单
  useEffect(() => {
    if ((!keys.currentSideMenu && !!currentTopMenu)
      || (!!currentTopMenu && !matchPath(pathname, { path: keys.currentSideMenu }))) {
      let currentSideMenu = '';
      let currentOpenSubs: any[] = [];
      // 当前打开的菜单，默认是第一个
      if (!!sideMenu[currentTopMenu] && sideMenu[currentTopMenu].length !== 0) {
        // 如果当前的第0项 有下级路由，就要设置，当前展开的subMenu为第0项
        if (sideMenu[currentTopMenu][0].children.length !== 0) {
          currentOpenSubs = [sideMenu[currentTopMenu][0].path];
          currentSideMenu = sideMenu[currentTopMenu][0].children[0].path;
        } else {
          currentOpenSubs = [];
          currentSideMenu = `${sideMenu[currentTopMenu][0].path}`;
        }
      }
      console.log(currentSideMenu, currentOpenSubs, '默认选择');
      // 优先匹配二级菜单
      const subMenu = sideMenu[currentTopMenu].find((sub: ISidebarItem) => {
        const matchedRoute = matchPath(pathname, {
          path: sub.path,
        });

        return !!matchedRoute;
      });

      console.log('subMenu内的', subMenu,'pathname', pathname);
      if (subMenu) {
        if (subMenu.children && subMenu.children.length !== 0) {
          const { children } = subMenu;
          currentSideMenu = children?.[0].path;
          currentOpenSubs = [subMenu.path];
          // 匹配三级路由
          const selectSide: any = children.find((sub: IMenuItem) => {
            const matchedRoute = matchPath(pathname, {
              path: sub.path,
            });

            return !!matchedRoute;
          });
          if (selectSide) {
            // 判断还有没有四级路由
            if (selectSide.children && selectSide.children.length !== 0) {
              const { children } = selectSide;
              currentSideMenu = selectSide.children?.[0].path;
              currentOpenSubs = [selectSide.path];
              // 匹配最后一级路由
              const lastRoute: any = children.find((sub: IMenuItem) => {
                const matchedRoute = matchPath(pathname, {
                  path: sub.path,
                });

                return !!matchedRoute;
              });

              if (lastRoute) {
                currentSideMenu = lastRoute.path;
              }
            } else {
              currentSideMenu = selectSide.path;
            }
          }
        } else {
          currentOpenSubs = [subMenu.path];
          currentSideMenu = subMenu.path;
        }


      }

      // 匹配出来的路由 要和当前路径 match 保证万无一失，
      // 如果匹配失败，就重定向
      if (!matchPath(pathname, { path: currentSideMenu })) {
        console.log('重定向了---------', currentSideMenu);

        history.push(currentSideMenu)
      };

      setKeys({
        currentSideMenu,
        currentOpenSubs,
      })
    }

  }, [currentTopMenu, history, keys.currentSideMenu, pathname, sideMenu])

  const style = useMemo(() => ({
    sidebar: {
      boxShadow: `1px 0 6px ${primaryColor}`,
      background: theme === 'light' ? '#fff' : primaryColor,
    },
    logoColor: {
      backgroundColor: theme === 'light' ? '#fff' : primaryColor,
      color: theme === 'light' ? primaryColor : '#fff',
    }
  }), [primaryColor, theme])

  // subMenu 的展开关闭 监听事件
  const handleSubChange = useCallback((openKeys) => {
    console.log(openKeys);

    setKeys({
      ...keys,
      currentOpenSubs: openKeys,
    })
  }, [keys]);

  // 每一项的 点击事件
  const handleMenuItemClick = useCallback(({ key }) => {
    // 设置当前选中的selectKeys);
    console.log(key, 'key---');

    setKeys({
      ...keys,
      currentSideMenu: key,
    })

    history.push(key);
  }, [history, keys]);

  // 递归渲染 menu 菜单列表
  const renderMenu = useCallback((menuArray: any[]) => {
    return menuArray.map((item: any) => {
      if (item.children && item.children.length !== 0) {
        return (<SubMenu icon={<UserOutlined />} key={`${item.path}`} title={item.menuName}>{renderMenu(item.children)}</SubMenu>)
      } else {
        return (<Item icon={<UserOutlined />} key={`${item.path}`}>
          {item.menuName}
        </Item>)
      }
    })
  }, [])

  if (!currentTopMenu || !sideMenu[currentTopMenu] || sideMenu[currentTopMenu].length === 0) return null;

  return (
    <Sider
      className="sidebar"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ ...style.sidebar }}>
      <div
        className="logo"
      >
        <CodepenOutlined
          style={style.logoColor}
          className="logo-icon" />
        <span
          className="logo-title"
          style={style.logoColor}
        >
          宿舍管理系统
        </span>
      </div>
      {/* 手风琴列表 */}
      <Scrollbars style={{ height: 'calc(100vh - 48px)' }}>
        <Menu theme={theme} mode="inline"
          onClick={handleMenuItemClick}
          selectedKeys={[keys.currentSideMenu]}
          openKeys={keys.currentOpenSubs}
          onOpenChange={handleSubChange}>
          {renderMenu(sideMenu[currentTopMenu])}
        </Menu>
      </Scrollbars>
    </Sider>
  )
}

export default memo(LeftTopSidebar)