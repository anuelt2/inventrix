import React from 'react';
import PageHeader from './PageHeader';
import SideBar from './SideBar';
import Footer from './Footer';

const Layout = ({ children, sideBar}) => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <SideBar sideBar={sideBar} /> 
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
