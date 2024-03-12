import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./UserProfile.css";
import { FaEdit } from "react-icons/fa";
import { Tab, Tabs } from "@mui/material";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

import CourseStudent from "components/Profile/CourseStudent";
import { axiosInstance } from "api/config";
import ListCourses from "components/Profile/ListCourses";

export default function ProfileUser() {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Get_Specific_User/${localStorage.getItem("User_ID")}`)
        .then((res) => {
          setUser(res.data.data);
          setAvatar(`http://127.0.0.1:9000/${res.data.data.image}`);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result);
    };
    setUser({ ...user, image: file });
  };

  const handleEditIconClick = () => {
    document.getElementById("avatarInput").click();
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user)
      const response = await axiosInstance.put(`user/Update_User/${localStorage.getItem("User_ID")}`,user,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update Successfully" + response);
    } catch (error) {
      // Handle error (e.g., display error message to the user)
      console.log("Error : " + error);
    }
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
            textColor="primary"
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
                    name="image"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>

                <span className="fw-bold fs-3">
                  <span>{user.name}</span>
                </span>
                <span className="text-black-50">
                  <span>{user.email}</span>
                </span>
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
                        value={user.name}
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        value={user.phonenumber}
                        name="phonenumber"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={user.address}
                        name="address"
                        onChange={handleChange}
                      />
                    </div>
                    {user.usertype === "teacher" ? (
                      <div className=" row mt-3">
                        <div className="col-md-12">
                          <label className="labels">identification card</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="ID card"
                            value={user.identificationcard}
                            name="identificationcard"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Grade Level</label>
                          <select
                            value={user.gradelevels}
                            name="gradelevels"
                            className="form-control bg-white"
                            onChange={handleChange}
                          >
                            <option value=""> Choose Grade Level</option>
                            <option value="Primary">Primary</option>
                            <option value="Preparatory">Preparatory</option>
                            <option value="Secondary">Secondary</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <label className="labels">
                            Education Stage Level
                          </label>
                          <select
                            name="educationstage"
                            value={user.educationstage}
                            className="form-control bg-white"
                            onChange={handleChange}
                          >
                            <option value=""> Choose Educational Stage</option>
                            <option value="Primary">Primary</option>
                            <option value="Preparatory">Preparatory</option>
                            <option value="Secondary">Secondary</option>
                          </select>
                        </div>
                        <div className="col-md-12">
                          <label className="labels">Classroom</label>
                          <select
                            className="form-control bg-white"
                            name="classroom"
                            value={user.classroom}
                            onChange={handleChange}
                          >
                            <option value=""> Choose ClassRoom</option>
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
                      onClick={handleSubmit}
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
                </div>

                {user.usertype === "teacher" ? (
                  <div>
                    <ListCourses />
                    <div className="home-page-container">
                      <Link
                        to="/Addcourse"
                        className="btn btn-primary mt-3 add-course-button"
                      >
                        Add Course
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className="component"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "16px",
                      }}
                    >
                      <CourseStudent />
                      <CourseStudent />
                    </div>
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
