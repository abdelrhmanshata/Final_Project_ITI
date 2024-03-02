import React, { useContext } from "react";
import "../styles/admin.css";
import Sidebar from "../components/Admin/Sidebar";

import AdminContext from "../context/AdminContext";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import TeacherList from "../components/Admin/Teacher/TeacherList";
import StudentList from "../components/Admin/Student/StudentList";
import CourseList from "../components/Admin/Courses/CourseList";
export default function Admin() {
  const { adminPanel } = useContext(AdminContext);

  function getDashboardItem() {
    switch (adminPanel.activeItem) {
      case 0:
        return <Dashboard />;
      case 1:
        return <Dashboard />;
      case 2:
        return <TeacherList />;
      case 3:
        return <StudentList />;
      case 4:
        return <CourseList />;
      case 5:
        return <h1>5</h1>;
      case 6:
        return <h1>6</h1>;

      default:
        return <h1>0</h1>;
    }
  }

  return (
    <>
      <div className="body">
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard--content">{getDashboardItem()}</div>
        </div>
      </div>
    </>
  );
}
