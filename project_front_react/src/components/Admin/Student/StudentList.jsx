import React, { useState } from "react";
import "../../../styles/studentList.css";
import Image1 from "../../../assets/img/team-1.jpg";
import Image2 from "../../../assets/img/team-3.jpg";
import { Button } from "react-bootstrap";
import StudentProfile from "./StudentProfile";
const students = [
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

export default function StudentList() {
  const [student, setStudent] = useState(students[0]);
  const studentItem = (student, index) => {
    return (
      <>
        <div
          key={index}
          className="item-list-detail"
          onClick={() => setStudent(student)}
        >
          <div className="student--detail">
            <img src={student.image} alt={student.name} />
            <span>{student.name}</span>
          </div>
          <div className="text-center">
            <span>{student.email}</span>
          </div>
          <div className="text-end">
            <Button variant="danger" size="sm">
              Delete
            </Button>
            {/* <span style={{ color: student.active ? "green" : "red" }}>
              {student.active ? (
                <BiCheckCircle fontSize={"20"} />
              ) : (
                <BiXCircle fontSize={"20"} />
              )}
              Active
            </span> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="student--content">
      <div className="content" style={{ width: "50%" }}>
        <div className="student--list">
          <div className="list--header">
            <h2>Students</h2>
          </div>
          <div className="list--container">
            {students.map((student, index) => studentItem(student, index))}
          </div>
        </div>
      </div>
      <StudentProfile data={student} />
    </div>
  );
}
