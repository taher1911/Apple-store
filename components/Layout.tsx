import React, { useState } from "react";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";
import Footer from "./Footer";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar show={show} setShow={setShow} />
      <MobileSidebar show={show} setShow={setShow} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
