import React, { memo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { matchPath } from 'react-router-dom';
import {
  Menu,
} from 'antd';
import { MenuProps } from 'antd/lib/menu';
import {setCurrentTopMenu} from '../../../store/reducers/menu/action'
const { Item } = Menu;

interface IProps {
  history: any;
  location: any;
}

const TopMenu: React.FC<IProps> = (props) => {
  // const {history, location} = props;
  const dispatch = useDispatch()
  const { topMenu, currentTopMenu } = useSelector((state: any) => state.menu)
  const { history, location: {pathname} } = props;
  const handleGoPathClick = useCallback(({key}) => {
    dispatch(setCurrentTopMenu(key))

    history.push(key);

  }, [dispatch, history]);


  // 处理初始选中逻辑 和 侧边栏的 默认选中逻辑
  useEffect(() => {

    if(
      !currentTopMenu
      || pathname.split('/')[1] !== currentTopMenu.split('/')[1]
    ) {
      // 就要去寻找选中的是哪一项
      
      let selectedMenu = topMenu.find((menu: { path: any; }) => {
        console.log(menu);
        
        const matchedRoute = matchPath(
          pathname,
          {
            path: `/${menu.path}`,
          }
        );
        
        return !!matchedRoute;
      });
      
      // 现在处理一上来要选中哪一个的问题
      if( pathname === '/' ) {
        if( topMenu[0] ) {
          dispatch(setCurrentTopMenu(`/${topMenu[0].path}`))
        }
      } else if( selectedMenu ) {
        const path = selectedMenu.path;
        // 就设置当前选中的项
        dispatch(setCurrentTopMenu(`/${path}`))
      } else {
        // 如果什么都没有匹配到，就直接404
        // return history.push('/404');
      }
    }


  }, [currentTopMenu, dispatch, history, pathname, topMenu]);

  // 默认选中的menu
  const propsValue: MenuProps = {
    mode: 'horizontal',
  };
  if( !!currentTopMenu ) {
    propsValue.selectedKeys = [currentTopMenu];
  }

  return (
    <div className="top-menu">
      <Menu
        {...propsValue}
        onClick={handleGoPathClick}
      >
        {
          topMenu.map((item:any) => (
            <Item
              key={`/${item.path}`}

            >
              {
                item.name
              }
            </Item>
          ))
        }
      </Menu>
    </div>
  )
}


export default memo(TopMenu)