import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {Switch, Route} from 'react-router-dom'
// import {Breadcrumb} from 'antd'

import './index.less'
interface IProps {
  history: any;
  location: any;
}


const TopMenu: React.FC<IProps> = (props) => {
  // const {history, location} = props;
  const { sildMenu } = useSelector((state: any) => state.menu)
  
  // 面包屑
  const crumbsCallback = useCallback((sildMenu, fatherPath?, fatherName?) => {
    let fatherPaths = fatherPath ? fatherPath : ''
    let fatherNames = fatherName ? fatherName : ''
    return sildMenu.map((item: { children: string | any[]; path: any; menuName: any; }) => {
      if(item.children && item.children.length !== 0) {
      return crumbsCallback(item.children, `${item.path}`, `${fatherNames ? fatherNames + ' /' : ''}${item.menuName}`)
      }else {
        // return <Route path={`${item.path}`} key={`${fatherPaths}`}><Breadcrumb.Item>{`${item.menuName}`}</Breadcrumb.Item></Route>
        return <Route path={`${item.path}`} key={`${fatherPaths}`}>{`${fatherNames} / ${item.menuName}`}</Route>
      }
    })
  }, []) 
  return (
    <div className="top-menu">
      <Switch>
          {crumbsCallback(sildMenu)}
      </Switch>
    </div>
  )
}


export default memo(TopMenu)