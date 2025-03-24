import React from 'react';
import PageHeader from './PageHeader';
import SideBar from './SideBar';
import Footer from './Footer';

const Layout = ({ children, sideBar}) => {
  
  return (
    <div className="flex flex-col min-h-screen mb-0 items-center">
      <PageHeader />
      <SideBar sideBar={sideBar} /> 
      <main className="flex-grow w-[100%] mb-30">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
