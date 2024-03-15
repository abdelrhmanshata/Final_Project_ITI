import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import { FaEdit } from "react-icons/fa";
import { Rating, Tab, Tabs } from "@mui/material";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { axiosInstance } from "api/config";
import ListCourses from "components/Profile/Teacher/ListCourses";
import CourseStudent from "components/Profile/CourseStudent";
import StudentEnrolls from "components/Profile/Enrolls/StudentEnrolls";
import "../../styles/teacherList.css";
export default function ProfileUser() {
  const [courses, setCourses] = useState([1, 2, 3]);
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
  }, []);

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
      const response = await axiosInstance.put(
        `user/Update_User/${localStorage.getItem("User_ID")}`,
        user,
        {
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
        <div className="rounded bg-white">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            className="tabs bg-light"
            centered
          >
            <Tab label="Profile" className="tabs" />
            <Tab label="Courses" className="tabs" />
            {user.usertype === "teacher" && (
              <Tab label="Enrolls" className="tabs" />
            )}
          </Tabs>
          <div className="row justify-content-center">
            {user.usertype === "teacher" ? (
              <>
                <div className="col-md-2 border-right">
                  <div className="d-flex flex-column align-items-center text-center py-5">
                    <div style={{ position: "relative" }}>
                      <img
                        className="rounded-circle"
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

                    <Rating name="read-only" value={4} readOnly />
                  </div>
                </div>
              </>
            ) : null}
            {selectedTab === 0 && (
              <div className="col-md-10 border-right">
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

                        <div className="col-md-12">
                          <label className="labels">Subject</label>
                          <select
                            value={user.subject}
                            name="subject"
                            className="form-control bg-white"
                            onChange={handleChange}
                          >
                            <option value="">Choose Subject</option>
                            <option value="Arabic">Arabic</option>
                            <option value="English ">English</option>
                            <option value="Computer Science">
                              Computer Science
                            </option>
                            <option value="History">History</option>
                            <option value="Geography">Geography</option>
                            <option value="Science">Science</option>
                            <option value="Physics ">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                          </select>
                        </div>

                        <div className="col-md-12">
                          <label className="labels">Description</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="description"
                            value={user.description}
                            name="description"
                            onChange={handleChange}
                          />
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
                <div className="teacher--list">
                  <div className="list--header">
                    <h4 className="text-right pt-5 pb-2">Courses</h4>
                    {user.isApprove ? (
                      <div className="btn">
                        <Link to="/Addcourse" className="btn btn-primary">
                          Add Course
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>

                {user.usertype === "teacher" ? (
                  <div>
                    <ListCourses />
                    <br />
                    <br />
                    <br />
                  </div>
                ) : (
                  <div>
                    <div className="container p-5">
                      <div
                        className="d-flex flex-wrap gap-4"
                        style={{ justifyContent: "space-around" }}
                      >
                        {courses.map((item) => (
                          <CourseStudent data={item} />
                          // <CourseItem data={item} />
                        ))}
                      </div>
                    </div>

                    {/* <div
                      className="component"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "16px",
                      }}
                    >
                      <CourseStudent />
                      <CourseStudent />
                    </div> */}
                  </div>
                )}
              </div>
            )}
            {selectedTab === 2 && (
              <div className="col-md-10 p-5">
                <StudentEnrolls />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
