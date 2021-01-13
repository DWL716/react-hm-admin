import {RouteConfigComponentProps} from 'react-router-config';

interface IRouteProps {
  history: RouteConfigComponentProps['history'];
  location: RouteConfigComponentProps['location'];
}

interface IProps extends IRouteProps {
  collapsed: boolean;
}

type IMenuItem = {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

// type ISidebar = Array<ISidebarItem>;

type ISidebarItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
  routes?: Array<IMenuItem>;
}