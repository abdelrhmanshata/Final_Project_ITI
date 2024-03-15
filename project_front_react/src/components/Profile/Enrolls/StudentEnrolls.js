import { Snackbar } from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useCallback, useEffect, useState } from "react";
import StudentItem from "./StudentItem";
import "../../../styles/teacherList.css";
export default function StudentEnrolls() {
  const [allStudentEnrolls, setAllStudentEnroll] = useState([]);
  const [studentEnrolls, setStudentEnroll] = useState([]);
  const [isUpdate, setIsUpdate] = useState(0);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`review/course/studentEnroll/${localStorage.getItem("User_ID")}`)
        .then((res) => {
          setStudentEnroll(res.data);
          setAllStudentEnroll(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [isUpdate]);

  // Snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //
  const getFilter = (value) => {
    console.log(value);

    if (value === "all") {
      setStudentEnroll(allStudentEnrolls);
    } else if (value === "accepted") {
      const filteredData = allStudentEnrolls.filter(
        (item) => item.is_approved === true
      );
      setStudentEnroll(filteredData);
    } else {
      const filteredData = allStudentEnrolls.filter(
        (item) => item.is_approved === false
      );
      setStudentEnroll(filteredData);
    }
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Done"
      />
      <div className="teacher--list">
        <div className="list--header">
          <h2>Students</h2>
          <select
            onChange={(e) => {
              getFilter(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="accepted">Accepted</option>
            <option value="not_accepted">Not Accepted</option>
          </select>
        </div>
        <div className="list--container">
          {studentEnrolls.map((item, index) => (
            <StudentItem
              index={index}
              data={item}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
