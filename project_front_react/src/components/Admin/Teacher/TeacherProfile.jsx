import React from "react";
import "../../../styles/profile.css";
import { BiChalkboard } from "react-icons/bi";
import { MdOutlineMoreVert } from "react-icons/md";
const courses = [
  { title: "Arabic", duration: "2 Hours" },
  { title: "English", duration: "4 Hours" },
  { title: "Math", duration: "6 Hours" },
  { title: "Math", duration: "6 Hours" },
];

export default function TeacherProfile({ data }) {
  return (
    <div className="profile">
      <div className="user--profile">
        {/* Header */}
        <div className="user--detail">
          <img src={data.image} alt="" />
          <h3 className="username">{data.name}</h3>
          <span className="profession">Teacher</span>
        </div>

        <div className="user--courses">
          {courses.map((course, index) => (
            <div key={index} className="course--item">
              <div className="course--detail">
                <div className="course--cover">
                  <BiChalkboard />
                </div>
                <div className="course--name">
                  <h5 className="title">{course.title}</h5>
                  <span className="duration">{course.duration}</span>
                </div>
              </div>
              <div className="action">
                <MdOutlineMoreVert />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
