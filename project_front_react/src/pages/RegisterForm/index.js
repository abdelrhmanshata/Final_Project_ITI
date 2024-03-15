import React, { useState } from "react";
import "./RegisterForm.css";
import { GiTeacher } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import { PiStudent, PiIdentificationCard } from "react-icons/pi";

import {
  FaUser,
  FaLock,
  FaRegAddressCard,
  FaMailBulk,
  FaPhone,
  FaRestroom,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "api/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineMenuBook } from "react-icons/md";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [action, setAction] = useState("Student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    classroom: "",
    gradelevels: "",
    address: "",
    identificationcard: "",
    educationstage: "",
    usertype: "student",
    image: null,
    description: "",
    subject: "",
    teacher_avg_score: 0.0,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === confirmPassword) {
      try {
        const response = await axiosInstance.post("user/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // Handle success (e.g., show success message to the user)
        if (response.status === 201) {
          notify("User registered successfully");
          setLoading(false);
          navigate(`/login`);
        }
      } catch (error) {
        // Handle error (e.g., display error message to the user)
        error.response.data.email.forEach((error) => {
          notify(error);
        });
        setLoading(false);
      }
    } else {
      notify("Password Not Matching");
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const notify = (Message) => toast(Message);

  return (
    <div className="body">
      <ToastContainer />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>{action}</h1>
          <div className="submit-container">
            <div
              className={action === "Student" ? "submit" : "submit gray"}
              onClick={() => {
                setAction("Teacher");
                setFormData({ ...formData, usertype: "teacher" });
              }}
            >
              <GiTeacher />
              Teacher
            </div>
            <div
              className={action === "Teacher" ? "submit" : "submit gray"}
              onClick={() => {
                setAction("Student");
                setFormData({ ...formData, usertype: "student" });
              }}
            >
              {" "}
              <PiStudent />
              Student{" "}
            </div>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={handleChange}
            />
            <FaMailBulk className="icon" />
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
          <div className="input-box">
            <input
              type="password"
              placeholder=" Confirm Password"
              required
              name="confirm_password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="tel"
              placeholder="Phone Number"
              required
              name="phonenumber"
              onChange={handleChange}
            />
            <FaPhone className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Addresss"
              required
              name="address"
              onChange={handleChange}
            />
            <FaRegAddressCard className="icon" />
          </div>
          {action === "Teacher" ? (
            <div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Identification Card"
                  required
                  name="identificationcard"
                  onChange={handleChange}
                />
                <PiIdentificationCard className="icon" />
              </div>
              <div className="input-box">
                <div className="input-group">
                  <input
                    type="file"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    className="file form-control"
                    placeholder="Image"
                    accept="image/*"
                    required
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>
                <CiImageOn className="icon" />
              </div>
              <div className="input-box">
                <select
                  name="gradelevels"
                  className="select-dropdown"
                  required
                  onChange={handleChange}
                >
                  <option value=""> Choose Grade Level</option>
                  <option value="Primary">Primary</option>
                  <option value="Preparatory">Preparatory</option>
                  <option value="Secondary">Secondary</option>
                </select>
                <div className="select-arrow">
                  <GiTeacher className="icon" />
                </div>
              </div>

              <div className="input-box">
                <select
                  className="select-dropdown"
                  name="subject"
                  required
                  onChange={handleChange}
                >
                  <option value="">Choose Subject</option>
                  <option value="Arabic">Arabic</option>
                  <option value="English ">English</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Science">Science</option>
                  <option value="Physics ">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
                <div className="select-arrow">
                  <MdOutlineMenuBook className="icon" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="input-box">
                <select
                  name="educationstage"
                  className="select-dropdown"
                  required
                  onChange={handleChange}
                >
                  <option value=""> Choose Educational Stage</option>
                  <option value="Primary">Primary</option>
                  <option value="Preparatory">Preparatory</option>
                  <option value="Secondary">Secondary</option>
                </select>
                <div className="select-arrow">
                  <PiStudent className="icon" />
                </div>
              </div>
              <div className="input-box">
                <select
                  name="classroom"
                  className="select-dropdown"
                  required
                  onChange={handleChange}
                >
                  <option value=""> Choose ClassRoom</option>
                  <option value="First">First</option>
                  <option value="Secound">Secound</option>
                  <option value="Third">Third</option>
                </select>
                <div className="select-arrow">
                  <FaRestroom className="icon" />
                </div>
              </div>
            </div>
          )}
          {loading ? (
            <div className="d-flex m-2 justify-content-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden"></span>
              </div>
            </div>
          ) : (
            <button type="submit">Register</button>
          )}
          <div className="register-link mt-2">
            <p>
              Already Create an Account?<Link to="/login">Login</Link>
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
