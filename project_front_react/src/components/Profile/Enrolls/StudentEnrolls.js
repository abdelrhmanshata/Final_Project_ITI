import { Snackbar } from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useCallback, useState } from "react";
import StudentItem from "./StudentItem";

export default function StudentEnrolls() {
  // ${localStorage.getItem("User_ID")}

  const [studentEnrolls, setStudentEnroll] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  const [isUpdate, setIsUpdate] = useState(0);
  const [filter, setFilter] = useState("all");

  // const getData = useCallback(async () => {
  //   try {
  //     await axiosInstance
  //       .get(`user/Print_All_Teachers`)
  //       .then((res) => {})
  //       .catch((err) => console.log(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   // getData();
  // }, [getData, isUpdate]);

  // Snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
              setFilter(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="accepted">Accepted</option>
            <option value="not_accepted">Not Accepted</option>
          </select>
        </div>
        <div className="list--container">
          {studentEnrolls.map((student, index) => (
            <StudentItem index={index} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
}
