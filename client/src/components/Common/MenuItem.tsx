import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  href: string;
  title: string;
}

const MenuItem = ({ href, title }: Props) => {
  return (
    <div className="sidebar__menu__item">
      <Link to={href}>{title}</Link>
    </div>
  );
};

export default MenuItem;
