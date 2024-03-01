import React, { useState } from "react";
import "./RegisterForm.css";
import { GiTeacher } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import { PiStudent,PiIdentificationCard  } from "react-icons/pi";

import { FaUser, FaLock,FaRegAddressCard,FaMailBulk, FaPhone,FaRestroom    } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function RegisterForm() {
  const [action,setAction] =useState("Student");
  return (
    <div className="body">
      <div className="wrapper">
        <form action="">
          <h1>{action}</h1>
          <div className="submit-container">
          <div className={action==="Student"?"submit":"submit gray"} onClick={()=>{setAction("Teacher")}} > < GiTeacher />Teacher </div>
          <div className={action==="Teacher"?"submit":"submit gray"} onClick={()=>{setAction("Student")}}> <PiStudent />Student </div>

          </div>
          <div className="input-box">
            <input type="text" placeholder="Name" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            < FaMailBulk  className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder=" Confirm Password" required />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input type="number" placeholder="Phone Number" required />
            < FaPhone className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder=" Addresss" required />
            <FaRegAddressCard className="icon" />
          </div>
          {action==="Teacher"?<div></div>:    <div>
          <div className="input-box">
    
        <select name="educationStage" className="select-dropdown" required>
          <option value=""> Choose Educational Stage</option>
          <option value="Primary">Primary</option>
          <option value="Preparatory">Preparatory</option>
          <option value="Secondary">Secondary</option>
        </select>
        <div className="select-arrow"><PiStudent className="icon" /></div>
     
    </div>
    <div className="input-box">
    
    <select name="Class Room"  className="select-dropdown" required>
      <option value=""> Choose ClassRoom</option>
      <option value="First">First</option>
      <option value="Secound">Secound</option>
      <option value="Third">Third</option>
    </select>
    <div className="select-arrow"><FaRestroom className="icon" /></div>
 
</div>
  </div>}
  {action==="Student"?<div></div>:    
  <div>
  <div className="input-box">
            <input type="number" placeholder="Identification Card" required />
            < PiIdentificationCard className="icon" />
          </div>
          <div className="input-box" >
            <input type="file"   className="file" placeholder="Image"accept="image/*" required />
            <  CiImageOn className="icon" />
          </div>
  <div className="input-box">
    
    <select name="gradlevel" className="select-dropdown" required>
      <option value=""> Choose Grade Level</option>
      <option value="Primary">Primary</option>
      <option value="Preparatory">Preparatory</option>
      <option value="Secondary">Secondary</option>
    </select>
    <div className="select-arrow"><GiTeacher className="icon" /></div>
 
</div>
</div>
}

          <button type="submit">Register</button>
          <div className="register-link">
            <p>
              Already Create an Account?<Link to="/login">Login</Link>
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
