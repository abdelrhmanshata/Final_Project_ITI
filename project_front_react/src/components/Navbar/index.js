import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";
export default function Navbar({ active, data }) {
  const isUpdate = useSelector((state) => state.update.isUpdate);
  const dispatch = useDispatch();
  // dispatch(updateState(isUpdate+1));

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
  }, [isUpdate]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    navigate(`/`);
    localStorage.setItem("User_ID", "");
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("User_JWT", "");
    localStorage.setItem("User_Type", "");
    dispatch(updateState(isUpdate + 1));
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
            <i className="fa fa-book me-3"></i>EduNexus
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
            {isUserAuth && (
              <Link
                to="/Chatting"
                className={
                  active === "Chatting"
                    ? "nav-item nav-link active"
                    : "nav-item nav-link"
                }
              >
                Chatting
              </Link>
            )}
            <Link
              to="/Aboutus"
              className={
                active === "About"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              About
            </Link>

            {active === "Back" && (
              <Link
                to={`/course/${data.id}`}
                className={"nav-item nav-link active"}
              >
                Back
              </Link>
            )}
          </div>
          {isUserAuth ? (
            <>
              <Button
                className="text-primary"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {isAdmin ? (
                  <MdAdminPanelSettings className="fs-3" />
                ) : (
                  <BiUserCircle className="fs-3" />
                )}
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  onClick={() => {
                    isAdmin ? navigate(`/admin`) : navigate(`/profile`);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
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
