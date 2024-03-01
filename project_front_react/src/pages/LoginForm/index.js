import React from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function LoginForm() {
  return (
    <div className="body">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <Link to="/">Forget password</Link>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account?<Link to="/register">Register</Link>
            </p>
          </div>
        </form>
       
      </div>
      <div className="top-left-button">
     
      <Link to="/"> 
        <button type="submit" className="to-home-button">To Home</button>
      </Link>
    </div>

    </div>
    
  );
}
