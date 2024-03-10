import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./UserProfile.css";
import { FaEdit } from "react-icons/fa";
import { Tab, Tabs } from "@mui/material";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

import { faPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardCourse from "components/Profile/CardCousre";


export default function ProfileUser() {
    const [name, setName] = useState("Student");
    const [email, setEmail] = useState("sarayasserma@mail.com.my");
    const [avatar, setAvatar] = useState("https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [action, setAction] = useState("Teacher");
    const [videoTitle, setVideoTitle] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result);
    };
  };

  const handleEditIconClick = () => {
    document.getElementById("avatarInput").click();
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };



  return (
    <>
      <Navbar />

      <div className="BBody">
        <div className="container rounded bg-white mt-5 mb-5 ">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="black"
            className="tabs"
            centered
          >
            <Tab label="Profile Settings" className="tabs" />
            <Tab label="Courses" className="tabs" />
          </Tabs>
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <div style={{ position: "relative" }}>
                  <img
                    className="rounded-circle mt-20"
                    width="150px"
                    src={avatar}
                    alt="User Avatar"
                  />
                  <FaEdit
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      cursor: "pointer",
                      backgroundColor: "LightGray",
                      borderRadius: "50%",
                      padding: "5px",
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={handleEditIconClick}
                  />
                  <input
                    type="file"
                    id="avatarInput"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </div>

                <span className="font-weight-bold">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      onBlur={() => setIsEditingName(false)}
                    />
                  ) : (
                    <span onClick={() => setIsEditingName(true)}>{name}</span>
                  )}
                </span>
                <span className="text-black-50">
                  {isEditingEmail ? (
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => setIsEditingEmail(false)}
                    />
                  ) : (
                    <span onClick={() => setIsEditingEmail(true)}>{email}</span>
                  )}
                </span>
                <span> </span>
              </div>
            </div>
            {selectedTab === 0 && (
              <div className="col-md-8 border-right">
                <div className="p-5 py-8">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                      />
                    </div>
                    {action === "Teacher" && (
                      <div className=" row mt-3">
                        <div className="col-md-12">
                          <label className="labels">identification card</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="ID card"
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="labels">Grade Level</label>
                          <select className="form-control bg-white">
                            <option value="Choose grade level">
                              Choose Grade Level
                            </option>
                            <option value="primary">primary</option>
                            <option value="preperatory">preperatory</option>
                            <option value="secondary">secondary</option>
                          </select>
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Image</label>
                          <input
                            type="file"
                            className="form-control bg-white"
                          />
                        </div>
                      </div>
                    )}
                    {action !== "Teacher" && (
                      <div className=" row mt-2">
                        <div className="col-md-12">
                          <label className="labels">Grade Level</label>
                          <select className="form-control bg-white">
                            <option value="Choose Educational Stage">
                              Choose Educational stage
                            </option>
                            <option value="primary">primary</option>
                            <option value="preperatory">preperatory</option>
                            <option value="secondary">secondary</option>
                          </select>
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Classroom</label>
                          <select className="form-control bg-white">
                            <option value="Choose ClassRoom">
                              Choose class Room
                            </option>
                            <option value="First">First</option>
                            <option value="Secound">Secound</option>
                            <option value="Third">Third</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-primary profile-button"
                      type="button"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 1 && (
              <div className="col border-right">
                <div className="p-5 py-8">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Courses</h4>
                   
                  </div>

                 
                  <div className="component" style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                      <CardCourse />
                      <CardCourse />
                      
                    </div>


                                          </div>
             
                {action === "Teacher" && (
                  <div className="home-page-container">
                    <Link
                      to="/Addcourse"
                      className="btn btn-primary mt-3 add-course-button"
                    >
                      Add Course
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
     
        <Footer />
    </> 
      
    );
}
