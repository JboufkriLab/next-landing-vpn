import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
    

      <Header />
      {children}
      <Footer />
      <button onClick={() => window.Intercom('show')}></button>
    </>
  );
};

export default Layout;
