import React, { useContext, useState } from "react";
import {
  BiBookAlt,
  BiChalkboard,
  BiGroup,
  BiHome,
  BiSolidGrid,
} from "react-icons/bi";
import "../../styles/sidebar.css";
import { Link } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import { MdSettings } from "react-icons/md";
export default function Sidebar() {
  const { adminPanel, setAdminPanel } = useContext(AdminContext);
  const [isActive, setActive] = useState(adminPanel.activeItem);
  const setItemActive = (item) => {
    setActive(item);
    setAdminPanel({
      activeItem: item,
    });
  };

  const openLinkInNewWindow = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="menu">
        <div className="logo">
          <BiBookAlt className="logo-icon" />
          <h2>EduNexus</h2>
        </div>
        <div className="menu--list"></div>
        <div className="menu--list">
          <Link
            to=""
            className={isActive === 0 ? "item active--item" : "item"}
            onClick={() => setItemActive(0)}
          >
            <BiSolidGrid className="icon" />
            Dashboard
          </Link>
          <Link to="/" className="item">
            <BiHome className="icon" />
            Home
          </Link>
          <Link
            to=""
            className={isActive === 1 ? "item active--item" : "item"}
            onClick={() => setItemActive(1)}
          >
            <BiGroup className="icon" />
            Teachers
          </Link>
          <Link
            to=""
            className={isActive === 2 ? "item active--item" : "item"}
            onClick={() => setItemActive(2)}
          >
            <BiGroup className="icon" />
            Students
          </Link>
          <Link
            to=""
            className={isActive === 3 ? "item active--item" : "item"}
            onClick={() => setItemActive(3)}
          >
            <BiChalkboard className="icon" />
            Courses
          </Link>
          <Link
            to=""
            className={isActive === 4 ? "item active--item" : "item"}
            onClick={() => openLinkInNewWindow("http://127.0.0.1:9000/admin/")}
          >
            <MdSettings className="icon" />
            More Operation ...
          </Link>
        </div>
      </div>
    </>
  );
}
