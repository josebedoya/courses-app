import React from 'react';
import { Menu } from 'antd';
import { DashboardOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar__menu'>
        <Menu
          style={{ width: 240 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <SubMenu
            key='sub1'
            title={
              <span>
                <BookOutlined />
                <span>Courses</span>
              </span>
            }
          >
            <Menu.Item key='2'>
              <Link to="/courses/tags">Tags</Link>
            </Menu.Item>
            <Menu.Item key='3'>
              <Link to="/courses/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key='4'>Courses</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
