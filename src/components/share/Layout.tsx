import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="layout__children">{children}</div>
    </>
  );
};

export default Layout;
