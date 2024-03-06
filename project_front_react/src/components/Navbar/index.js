

import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { Button, Menu, MenuItem } from "@mui/material";
export default function Navbar({ active }) {
  const navigate = useNavigate();
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("User_ID") !== null) {
      if (localStorage.getItem("User_ID").length !== 0) {
        setIsUserAuth(true);
      }

      if (localStorage.getItem("isAdmin") !== null) {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
      }
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.setItem("User_ID", "");
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("User_JWT", "");
    localStorage.setItem("User_Type", "");
    window.location.reload();
  };

  return (
    <>
      {/* <!-- Navbar Start --> */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3"></i>E-LEARNING
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link
              to="/"
              className={
                active === "Home"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={
                active === "Courses"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              Courses
            </Link>
            <Link
              to="/teachers"
              className={
                active === "Teachers"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              Teachers
            </Link>
            <Link
              to="/ssss"
              className={
                active === "About"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              About
            </Link>
            {/* <div className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </Link>
              <div className="dropdown-menu fade-down m-0">
                <Link to="/" className="dropdown-item">
                  Our Team
                </Link>
                <Link to="/" className="dropdown-item">
                  Testimonial
                </Link>
                <Link to="/77" className="dropdown-item">
                  404 Page
                </Link>
              </div>
            </div> */}
          </div>
          {isUserAuth ? (
            isAdmin ? (
              <Link to="/admin" className="btn btn-primary py-4">
                <MdAdminPanelSettings className="fs-3" />
              </Link>
            ) : (
              <Link to="/profile" className="btn btn-primary py-4">
                <BiUserCircle className="fs-3" />
              </Link>
            )
          ) : (
            <Link
              to="/login"
              className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
            >
              Join Now<i className="fa fa-arrow-right ms-3"></i>
            </Link>
          )}
        </div>
      </nav>
      {/* <!-- Navbar End --> */}
    </>
  );

          }