import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/teacherList.css";
import TeacherProfile from "./TeacherProfile";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { axiosInstance } from "api/config";

export default function TeacherList() {
  const [teacher, setTeacher] = useState({});
  const [allTeachers, setAllTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Teachers`)
        .then((res) => {
          setTeachers(res.data.data);
          setAllTeachers(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const teacherItem = (teacher, index) => {
    return (
      <>
        <div
          key={index}
          className="item-list-detail"
          onClick={() => setTeacher(teacher)}
        >
          <div className="teacher--detail">
            <img
              src={`http://127.0.0.1:9000/${teacher.image}`}
              alt={teacher.name}
            />
            <span>{teacher.name}</span>
          </div>
          <div className="text-center">
            <span>{teacher.email}</span>
          </div>
          <div className="text-end">
            <span style={{ color: teacher.isApprove ? "green" : "red" }}>
              {teacher.isApprove ? (
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

  const getCoursesByCategory = (value) => {
    console.log(value);
    if (value === "all") {
      setTeachers(allTeachers);
    } else if (value === "accepted") {
      const filteredData = allTeachers.filter(
        (item) => item.isApprove === true
      );
      setTeachers(filteredData);
    } else {
      const filteredData = allTeachers.filter(
        (item) => item.isApprove === false
      );
      setTeachers(filteredData);
    }
  };

  return (
    <div className="teacher--content">
      <div className="content" style={{ width: "60%" }}>
        <div className="teacher--list">
          <div className="list--header">
            <h2>Teachers</h2>
            <select
              onChange={(e) => {
                getCoursesByCategory(e.target.value);
              }}
            >
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
