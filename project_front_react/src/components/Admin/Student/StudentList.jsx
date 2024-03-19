import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/studentList.css";
import { Button } from "react-bootstrap";
import StudentProfile from "./StudentProfile";
import { axiosInstance } from "api/config";
import { Snackbar } from "@mui/material";

export default function StudentList() {
  const [isUpdate, setIsUpdate] = useState(0);
  const [student, setStudent] = useState({});
  const [students, setStudents] = useState([]);

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Students`)
        .then((res) => {
          setStudents(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData, isUpdate]);

  const deleteStudent = async (student) => {
    try {
      await axiosInstance
        .get(`user/Delete_User/${student.id}`)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setOpen(true);
            setIsUpdate(isUpdate + 1);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const studentItem = (student) => {
    return (
      <div
        key={student.id}
        className="item-list-detail"
        onClick={() => setStudent(student)}
      >
        <div className="student--detail">
          <img
            src={`http://127.0.0.1:9000/${student.image}`}
            alt={student.name}
          />
          <span>{student.name}</span>
        </div>
        <div className="text-center">
          <span>{student.email}</span>
        </div>
        <div className="text-end">
          <Button
            variant="danger"
            size="sm"
            onClick={() => deleteStudent(student)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Done"
      />

      <div className="student--content">
        <div className="content" style={{ width: "40%" }}>
          <div className="student--list">
            <div className="list--header">
              <h2>Students</h2>
            </div>
            <div className="list--container">
              {students.map((student) => studentItem(student))}
            </div>
          </div>
        </div>
        <StudentProfile data={student} />
      </div>
    </>
  );
}
