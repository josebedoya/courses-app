import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const LayoutSidebarLeft = ({ children }: Props) => {
  return (
    <>
      <Sidebar />
      <div className='main-content'>
        <Header />
        <div className='main-content__wrapper'>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default LayoutSidebarLeft;
