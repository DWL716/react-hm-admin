

const breadcrumb = {};

/*
* 抽离逻辑出来
* 协助recursiveMenu 处理下级路由
* @params: rootPath 跟路径
* */
export const createMenu = (rootPath: any, routes: any[]) => {
  const menu: any = [];

  routes.forEach(subMenu => {
    const underMenu: any = [];
    if( subMenu.children ) {
      // 又要去遍历这个对象
      subMenu.children.forEach((under: any) => {
        // 在这里边处理
        const basePath = rootPath + subMenu.path;
        // if( permissions ) { // 处理权限 }
        if( under.path ) {
          // 处理面包屑
          breadcrumb[basePath + under.path] = {
            icon: under.icon,
            name: under.name,
          }
          // 处理underMenu
          underMenu.push({
            icon: under.icon,
            name: under.name,
            path: basePath + under.path,
          });
        }
        if( under.children ) {
          under.children.forEach((lastRoute: any) => {
            if( lastRoute.path ) {
              breadcrumb[basePath + under.path + lastRoute.path] = {
                icon: lastRoute.icon,
                name: lastRoute.name,
              }
            }
          })
        }
        // 还需要在这里，处理 面包屑
        breadcrumb[`${rootPath}${subMenu.path}`] = {
          name: subMenu.name,
          icon: subMenu.icon,
        }
      });

      if( underMenu.length !== 0 ) {
        menu.push({
          icon: subMenu.icon,
          name: subMenu.name,
          path: `${rootPath}${subMenu.path}`,
          routes: underMenu,
        });
      }

    } else {
      menu.push({
        icon: subMenu.icon,
        name: subMenu.name,
        path: `${rootPath}${subMenu.path}`,
      });

      // 还需要在这里，处理 面包屑
      breadcrumb[`${rootPath}${subMenu.path}`] = {
        name: subMenu.name,
        icon: subMenu.icon,
      }
    }
  })

  return menu;
}


/*
* 处理数据，返回路由所需数据的函数
* @params: routes ===> 路由对象
* @params: permissions ===> 后端返回给咱们的权限码 是一个数组。
* */
export const recursiveMenu = (routes: any[], permissions = []) => {
  // console.log('thunk里面的routes-----', routes);
  const topMenu: any[] = [];
  const sideMenu = {};

  routes.forEach(route => {
    const path = route.path;
    topMenu.push({
      name: route.menuName,
      path: route.path || '',
      icon: route.icon,
    });
    if( route.children ) {
      // 说明应该处理 breadcrumb
      // sideMenu[path] = createMenu(path, route.children);
      sideMenu[`/${path}`] = createMenuMath(path, route.children);

      breadcrumb[path] = {
        name: route.menuName,
        icon: route.icon,
      }
    }
  });

  return {
    topMenu,
    breadcrumb,
    sideMenu,
  }

}

// 递归处理 path 路径
export const createMenuMath = (rootPath: any, routes: any[]): any[] => {
  return routes.map((item: any) => {
    if (item.children && item.children.length !== 0) {
      item.children = createMenuMath(`${rootPath}/${item.path}`, item.children);
      item.path = `/${rootPath}/${item.path}`;
      return item;
    } else {
      item.path = `/${rootPath}/${item.path}`;
      return item
    }
  });
};

/* 
const renderMenu = useCallback((menuArray: any, father?: any) => {

    let fatherCopy = father ? father : ''

    return menuArray.map((item: any) => {
      // console.log(item);

      if (item.children && item.children.length !== 0) {
        return (<SubMenu icon={<UserOutlined />} key={`${currentTopMenu}/${item.path}`} title={item.menuName}>{renderMenu(item.children, `${fatherCopy}/${item.path}`)}</SubMenu>)
      } else {
        return (<Item icon={<UserOutlined />} key={`${currentTopMenu}${fatherCopy}/${item.path}`}>
          {item.menuName}
        </Item>)
      }
    })
  }, [currentTopMenu])

*/