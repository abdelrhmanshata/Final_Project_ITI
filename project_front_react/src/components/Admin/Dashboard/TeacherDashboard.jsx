import React from "react";
import "../../../styles/teacherList.css";
import Image1 from "../../../assets/img/team-3.jpg";
import { Button } from "react-bootstrap";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
const teachers = [
  {
    image: Image1,
    name: "Prof. AbdElrhman",
    email: "abdelrhman@gmail.com",
    active: true,
  },
  {
    image: Image1,
    name: "Prof. AbdElrhman",
    email: "abdelrhman@gmail.com",
    active: false,
  },
  {
    image: Image1,
    name: "Prof. AbdElrhman",
    email: "abdelrhman@gmail.com",
    active: false,
  },
];

export default function TeacherDashboard() {
  const teacherItem = (teacher, index) => {
    return (
      <>
        <div key={index} className="item-list">
          <div className="teacher--detail">
            <img src={teacher.image} alt={teacher.name} />
            <span>{teacher.name}</span>
          </div>
          <div>
            <span>{teacher.email}</span>
          </div>

          <div>
            <span style={{ color: teacher.active ? "green" : "red" }}>
              {teacher.active ? (
                <BiCheckCircle fontSize={"20"} />
              ) : (
                <BiXCircle fontSize={"20"} />
              )}
              Active
            </span>
          </div>

          <div className="action--button">
            <Button variant="primary" size="sm">
              Approve
            </Button>

            <Button variant="danger" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </>
    );
  };
  return (
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
  );
}
