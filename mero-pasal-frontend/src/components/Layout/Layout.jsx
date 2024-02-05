import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: "82vh" }}>
        <ToastContainer />
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
