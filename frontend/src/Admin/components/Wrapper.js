import React, { useState } from "react";
import {  FaTimes } from "react-icons/fa";
import AdminSideBar from "./AdminSideBar";
import classes from "./Wrapper.module.css";
import { IoMdMenu } from "react-icons/io";

function Wrapper(props) {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <>
      <main className={classes.main}>
        <aside className={classes.aside}>
          <AdminSideBar />
        </aside>
        <div className={classes.overflow_wrapper}>
          <article className={classes.article}>{props.children}</article>
        </div>
        <div className={classes.hamburger_icon}>
         <IoMdMenu onClick={() => setShowMobileNav(true)} size={28} color="black" />
        </div>
      </main>

      {showMobileNav && (
        <div className={classes.float_side_nav}>
          <AdminSideBar />
          <div className={classes.close_}>
            <FaTimes onClick={() => setShowMobileNav(false)} color={"white"} />
          </div>
        </div>
      )}
    </>
  );
}

export default Wrapper;
