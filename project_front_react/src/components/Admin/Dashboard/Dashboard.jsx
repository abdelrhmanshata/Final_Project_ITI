import React from "react";
import ContentHeader from "./ContentHeader";
import "../../../styles/content.css";
import TeacherDashboard from "./TeacherDashboard";
export default function Dashboard() {
  return (
    <div className="content">
      <ContentHeader />
      <TeacherDashboard />
    </div>
  );
}
