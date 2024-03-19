import React, { useContext } from "react";
import "../styles/admin.css";
import Sidebar from "../components/Admin/Sidebar";

import AdminContext from "../context/AdminContext";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import TeacherList from "../components/Admin/Teacher/TeacherList";
import StudentList from "../components/Admin/Student/StudentList";
import CourseList from "../components/Admin/Courses/CourseList";
import Tables from "../components/Admin/Payment/Tables";
export default function Admin() {
  const { adminPanel } = useContext(AdminContext);

  function getDashboardItem() {
    switch (adminPanel.activeItem) {
      case 0:
        return <Dashboard />;
      case 1:
        return <TeacherList />;
      case 2:
        return <StudentList />;
      case 3:
        return <CourseList />;
      case 4:
        return <Tables />;
      default:
        return <Dashboard />;
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
