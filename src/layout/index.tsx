import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { Layout, Drawer, Form, Radio, Button, Spin } from 'antd';
import lg from '../static/language.json'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import LeftTopSidebar from './left-top';
import RightMenu from './components/right-menu';
import TopMenu from './components/top-menu'
import BreadcrumbComponent from './components/breadcrumb';
import { setTheme, setDrawer, setLanguage } from '../store/reducers/layout/action'
import { getHttpMenu } from '../store/reducers/menu/action'


import './index.less';

const { Header, Content } = Layout;
const { Group } = Radio;
const { Item } = Form;

const AdminLayout: React.FC<RouteConfigComponentProps & any> = (props) => {
  const { route, history, location } = props;
  const [form] = Form.useForm();
  // console.log(route, 'route=====');

  const { theme, drawer, primaryColor, language } = useSelector((state: any) => state.layout);
  const { topMenu } = useSelector((state: any) => state.menu)

  const dispatch = useDispatch()
  // 当前收起状态
  const [collapsed, setCollapsed] = useState(false);
  // 请求 权限 menu 菜单导航
  useEffect(() => {
    dispatch(getHttpMenu(location.pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  // 设置导航主题
  const handleSettingClick = useCallback((values) => {
    dispatch(setTheme(values.theme));
    dispatch(setLanguage(values.language));
  }, [dispatch]);
  // 恢复系统默认
  const recoverSettingClick = useCallback((e) => {
    dispatch(setTheme("dark"));
    dispatch(setLanguage("zh_CN"));
    form.setFieldsValue({
      theme: "dark",
      language: "zh_CN"
    });
  }, [dispatch, form]);
  // 设置右侧边栏的收缩
  const handleDrawerClose = () => {
    dispatch(setDrawer(false))
  }

  // 设置左侧边栏的收缩
  const toggle = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])
  if (topMenu.length === 0) return <Spin className="spin-center" />

  return (
    <Layout className="layout">

      <LeftTopSidebar
        collapsed={collapsed}
        history={history}
        location={location} />
      <Layout className="layout-header">
        <Header
          className="layout-header-background"
        >
          <div className="layout-header-top">
            {

              <div
                className='trigger'
                style={{
                  color: primaryColor,
                }}
              >
                {
                  React.createElement(
                    collapsed
                      ? MenuUnfoldOutlined
                      : MenuFoldOutlined,
                    { onClick: toggle }
                  )
                }
              </div>
            }
            <div className="box1">
              <TopMenu
                history={history}
                location={location}
              />
            </div>
            <div className="box2">
              <RightMenu />
            </div>
          </div>
          <Drawer
            width={320}
            visible={drawer}
            onClose={handleDrawerClose}
          >
            <Form
              onFinish={handleSettingClick}
              form={form}
              initialValues={{
                theme,
                language
              }}
            >
              <Item
                label={`${lg[language]["theme"]}`}
                name="theme"
              >
                <Group value={theme}>
                  <Radio value="dark">dark-暗色系</Radio>
                  <Radio value="light">light-亮色系</Radio>
                </Group>
              </Item>
              <Item
                label={`${lg[language]["setting"]}`}
                name="language"
              >
                <Group value={language}>
                  <Radio value="zh_CN">{lg[language]["en-zh"]}</Radio>
                  <Radio value="en_US">{lg[language]["en-us"]}</Radio>
                  <Radio value="ko_KR">{lg[language]["ko-kr"]}</Radio>
                </Group>
              </Item>
              <Item>
                <Button
                  onClick={recoverSettingClick}
                  style={{
                    marginRight: "20px"
                  }}
                >
                  {lg[language]["restoreSystemSettings"]}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  {lg[language]["preserve"]}
                </Button>
              </Item>
            </Form>
          </Drawer>
        </Header>
        <Content
          className="layout-content"
        >
          <BreadcrumbComponent history={history} location={location} />
          {renderRoutes(route?.routes)}
        </Content>
      </Layout>
    </Layout>
  )
}

export default memo(AdminLayout);