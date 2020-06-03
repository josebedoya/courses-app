import React from 'react';
import LayoutSidebarLeft from './LayoutSidebarLeft';

interface Props {
  type?: string;
  children: React.ReactNode;
}

const Layout = ({ type = 'left-sidebar', children }: Props): JSX.Element => {
  if (type === 'main') {
    return <div>{children}</div>;
  }
  return <div className="layout layout--sidebar-left"><LayoutSidebarLeft>{children}</LayoutSidebarLeft></div>;
}

export default Layout;