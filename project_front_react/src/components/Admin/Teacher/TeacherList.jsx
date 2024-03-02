import React, { useState } from "react";
import "../../../styles/teacherList.css";
import Image1 from "../../../assets/img/team-3.jpg";
import Image2 from "../../../assets/img/team-1.jpg";
import TeacherProfile from "./TeacherProfile";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
const teachers = [
  {
    image: Image1,
    name: "AbdElrhman",
    email: "abdelrhman@gmail.com",
  },
  {
    image: Image2,
    name: "Ahmed",
    email: "abdelrhman@gmail.com",
  },
  {
    image: Image1,
    name: "Ali",
    email: "abdelrhman@gmail.com",
  },
];

export default function TeacherList() {
  const [teacher, setTeacher] = useState(teachers[0]);
  const teacherItem = (teacher, index) => {
    return (
      <>
        <div
          key={index}
          className="item-list-detail"
          onClick={() => setTeacher(teacher)}
        >
          <div className="teacher--detail">
            <img src={teacher.image} alt={teacher.name} />
            <span>{teacher.name}</span>
          </div>
          <div className="text-center">
            <span>{teacher.email}</span>
          </div>
          <div className="text-end">
            <span style={{ color: teacher.active ? "green" : "red" }}>
              {teacher.active ? (
                <BiCheckCircle fontSize={"20"} />
              ) : (
                <BiXCircle fontSize={"20"} />
              )}
              Active
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="teacher--content">
      <div className="content" style={{ width: "50%" }}>
        <div className="teacher--list">
          <div className="list--header">
            <h2>Teachers</h2>
            <select>
              <option value="all">All</option>
              <option value="accepted">Accepted</option>
              <option value="not_accepted">Not Accepted</option>
            </select>
          </div>
          <div className="list--container">
            {teachers.map((teacher, index) => teacherItem(teacher, index))}
          </div>
        </div>
      </div>
      <TeacherProfile data={teacher} />
    </div>
  );
}
