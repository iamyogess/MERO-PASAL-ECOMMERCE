import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <main style={{minHeight:"82vh"}}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
