import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "api/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./ForgetPassword";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isRememberMe, setIsRememberMe] = useState(false);
  //
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("user/login", formData);
      // Handle success (e.g., show success message to the user)
      if (response.status === 200) {
        if (isRememberMe) {
          console.log("Remember");
        }
        localStorage.setItem("User_ID", response.data.userID);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("User_JWT", response.data.jwt);
        localStorage.setItem("User_Type", response.data.userType);
        navigate(`/`);
        setLoading(false);
        notify("User Login Successfully");
        window.location.reload();
      }
    } catch (error) {
      // Handle error (e.g., display error message to the user)
      notify(error.response.data.detail);
      setLoading(false);
    }
  };
  const notify = (Message) => toast(Message);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="body">
      <ToastContainer />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              name="email"
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsRememberMe(e.target.checked);
                }}
              />
              Remember Me
            </label>
            <p onClick={handleClickOpen}>Forget password</p>
            <ForgetPassword open={open} handleClose={handleClose} notify={notify} />
          </div>
          {loading ? (
            <div className="d-flex m-2 justify-content-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden"></span>
              </div>
            </div>
          ) : (
            <button type="submit">Login</button>
          )}

          <div className="register-link mt-2">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
      <div className="top-left-button">
        <Link to="/">
          <button type="submit" className="to-home-button">
            To Home
          </button>
        </Link>
      </div>
    </div>
  );
}
