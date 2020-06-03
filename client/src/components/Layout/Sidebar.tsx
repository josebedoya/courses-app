import React from 'react';
import MenuItem from '../Common/MenuItem';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar__menu'>
        <MenuItem href='/dashboard' title='Dashboard' />
        <MenuItem href='/courses' title='Courses' />
        <MenuItem href='/my-profile' title='My Profile' />
      </div>
    </aside>
  );
};

export default Sidebar;
