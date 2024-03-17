import { Avatar, Button, Paper, Typography } from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useEffect, useState } from "react";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";

export default function StudentItem({ index, data, isUpdate, setIsUpdate }) {
  const [course, setCourse] = useState({});
  const [student, setStudent] = useState({});

  const getCourseData = async () => {
    await axiosInstance
      .get(`course/details/${data.courseID}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getStudentData = async () => {
    try {
      await axiosInstance
        .get(`user/Get_Specific_User/${data.studentID}`)
        .then((res) => {
          setStudent(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseData();
    getStudentData();
  }, [isUpdate]);

  const isApproveStudent = async (value) => {
    try {
      await axiosInstance
        .post(
          `review/isApprove/enrollment/${data.studentID}/${data.courseID}/${value}`
        )
        .then((res) => {
          console.log(res.data.status);
          setIsUpdate(isUpdate + 1);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={5} className="p-2 mt-2">
      <div className="row align-items-center ">
        <div className="col-md-2 col-12   d-flex  flex-md-row  flex-column  justify-content-center align-items-center gap-2">
          <Avatar
            alt={course.name}
            src={course.courseImage}
            sx={{ width: 35, height: 35 }}
          />
          <Typography variant="body1" component="div">
            {course.courseName}
          </Typography>
        </div>
        <div className="col-md-3 col-6   d-flex justify-content-center align-items-center gap-2">
          <Typography variant="body1" component="div">
            {student.name}
          </Typography>
        </div>
        <div className="col-md-3 col-6   d-flex justify-content-center align-items-center gap-2">
          <Typography variant="body1" component="div">
            {student.email}
          </Typography>
        </div>
        <div className="col-md-2 col-6   d-flex justify-content-center align-items-center">
          <span style={{ color: data.is_approved ? "green" : "red" }}>
            {data.is_approved ? (
              <BiCheckCircle fontSize={"20"} />
            ) : (
              <BiXCircle fontSize={"20"} />
            )}
            Approve
          </span>
        </div>
        <div className="col-md-2 col-6   justify-content-center action--button">
          {data.is_approved ? (
            <Button
              variant="contained"
              color="error"
              size="sm"
              style={{ width: "100px" }}
              onClick={() => {
                isApproveStudent("False");
              }}
            >
              Block
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="sm"
              style={{ width: "100px" }}
              onClick={() => {
                isApproveStudent("True");
              }}
            >
              Approve
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
}
