import { recursiveMenu } from './utils';

// const data = [{"children":[{"children":[],"component":"system/user/index","icon":"user","isCache":"0","isFrame":"1","menuId":100,"menuName":"用户管理","menuType":"C","orderNum":"1","parentId":1,"path":"user","perms":"system:user:list","status":"0","visible":"0"},{"children":[],"component":"system/role/index","icon":"peoples","isCache":"0","isFrame":"1","menuId":101,"menuName":"角色管理","menuType":"C","orderNum":"2","parentId":1,"path":"role","perms":"system:role:list","status":"0","visible":"0"},{"children":[],"component":"system/menu/index","icon":"tree-table","isCache":"0","isFrame":"1","menuId":102,"menuName":"菜单管理","menuType":"C","orderNum":"3","parentId":1,"path":"menu","perms":"system:menu:list","status":"0","visible":"0"},{"children":[],"component":"system/dept/index","icon":"tree","isCache":"0","isFrame":"1","menuId":103,"menuName":"部门管理","menuType":"C","orderNum":"4","parentId":1,"path":"dept","perms":"system:dept:list","status":"0","visible":"0"},{"children":[],"component":"system/post/index","icon":"post","isCache":"0","isFrame":"1","menuId":104,"menuName":"岗位管理","menuType":"C","orderNum":"5","parentId":1,"path":"post","perms":"system:post:list","status":"0","visible":"0"},{"children":[],"component":"system/dict/index","icon":"dict","isCache":"0","isFrame":"1","menuId":105,"menuName":"字典管理","menuType":"C","orderNum":"6","parentId":1,"path":"dict","perms":"system:dict:list","status":"0","visible":"0"},{"children":[],"component":"system/config/index","icon":"edit","isCache":"0","isFrame":"1","menuId":106,"menuName":"参数设置","menuType":"C","orderNum":"7","parentId":1,"path":"config","perms":"system:config:list","status":"0","visible":"0"},{"children":[],"component":"system/notice/index","icon":"message","isCache":"0","isFrame":"1","menuId":107,"menuName":"通知公告","menuType":"C","orderNum":"8","parentId":1,"path":"notice","perms":"system:notice:list","status":"0","visible":"0"},{"children":[{"children":[],"component":"monitor/operlog/index","icon":"form","isCache":"0","isFrame":"1","menuId":500,"menuName":"操作日志","menuType":"C","orderNum":"1","parentId":108,"path":"operlog","perms":"monitor:operlog:list","status":"0","visible":"0"},{"children":[],"component":"monitor/logininfor/index","icon":"logininfor","isCache":"0","isFrame":"1","menuId":501,"menuName":"登录日志","menuType":"C","orderNum":"2","parentId":108,"path":"logininfor","perms":"monitor:logininfor:list","status":"0","visible":"0"}],"component":"","icon":"log","isCache":"0","isFrame":"1","menuId":108,"menuName":"日志管理","menuType":"M","orderNum":"9","parentId":1,"path":"log","perms":"","status":"0","visible":"0"}],"icon":"system","isCache":"0","isFrame":"1","menuId":1,"menuName":"系统管理","menuType":"M","orderNum":"1","parentId":0,"path":"system","perms":"","status":"0","visible":"0"},{"children":[{"children":[],"component":"monitor/online/index","icon":"online","isCache":"0","isFrame":"1","menuId":109,"menuName":"在线用户","menuType":"C","orderNum":"1","parentId":2,"path":"online","perms":"monitor:online:list","status":"0","visible":"0"},{"children":[],"component":"monitor/job/index","icon":"job","isCache":"0","isFrame":"1","menuId":110,"menuName":"定时任务","menuType":"C","orderNum":"2","parentId":2,"path":"job","perms":"monitor:job:list","status":"0","visible":"0"},{"children":[],"component":"monitor/druid/index","icon":"druid","isCache":"0","isFrame":"1","menuId":111,"menuName":"数据监控","menuType":"C","orderNum":"3","parentId":2,"path":"druid","perms":"monitor:druid:list","status":"0","visible":"0"},{"children":[],"component":"monitor/server/index","icon":"server","isCache":"0","isFrame":"1","menuId":112,"menuName":"服务监控","menuType":"C","orderNum":"4","parentId":2,"path":"server","perms":"monitor:server:list","status":"0","visible":"0"},{"children":[],"component":"monitor/cache/index","icon":"redis","isCache":"0","isFrame":"1","menuId":113,"menuName":"缓存监控","menuType":"C","orderNum":"5","parentId":2,"path":"cache","perms":"monitor:cache:list","status":"0","visible":"0"}],"icon":"monitor","isCache":"0","isFrame":"1","menuId":2,"menuName":"系统监控","menuType":"M","orderNum":"2","parentId":0,"path":"monitor","perms":"","status":"0","visible":"0"},{"children":[{"children":[],"component":"tool/build/index","icon":"build","isCache":"0","isFrame":"1","menuId":114,"menuName":"表单构建","menuType":"C","orderNum":"1","parentId":3,"path":"build","perms":"tool:build:list","status":"0","visible":"0"},{"children":[],"component":"tool/gen/index","icon":"code","isCache":"0","isFrame":"1","menuId":115,"menuName":"代码生成","menuType":"C","orderNum":"2","parentId":3,"path":"gen","perms":"tool:gen:list","status":"0","visible":"0"},{"children":[],"component":"tool/swagger/index","icon":"swagger","isCache":"0","isFrame":"1","menuId":116,"menuName":"系统接口","menuType":"C","orderNum":"3","parentId":3,"path":"swagger","perms":"tool:swagger:list","status":"0","visible":"0"}],"icon":"tool","isCache":"0","isFrame":"1","menuId":3,"menuName":"系统工具","menuType":"M","orderNum":"3","parentId":0,"path":"tool","perms":"","status":"0","visible":"0"},{"children":[],"icon":"guide","isCache":"0","isFrame":"0","menuId":4,"menuName":"若依官网","menuType":"M","orderNum":"4","parentId":0,"path":"http://ruoyi.vip","perms":"","status":"0","visible":"0"}]

const initialStore = {
  sildMenu: [],
  topMenu: [],
  currentSidebar: [],
  currentTopMenu: null,
  sideMenu: {}
};

interface IAction {
  type: string;
  [propName: string]: any;
}

function render(store = initialStore, action: IAction) {
  switch (action.type) {
    case "SET_MENU":
      const { topMenu, breadcrumb, sideMenu } = recursiveMenu(action.sildMenu);
      // console.log('menu设置', topMenu, breadcrumb, sideMenu);
      
      return { ...store, sildMenu: action.sildMenu, topMenu: topMenu, sideMenu};
    case "SET_CURRENT_MENU":
      return {...store, currentSidebar: store.sideMenu[action.currentTopMenu] || []}
    case "SET_TOP_MENU":
      return {...store, topMenu: action.topMenu}
    case "SET_CURRENT_TOP_MENU":
      return {...store, currentTopMenu: action.currentTopMenu}
    default:
      return store;
  }
}

export default render;
