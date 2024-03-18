import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/teacherList.css";
import { Button } from "react-bootstrap";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { axiosInstance } from "api/config";
import { Snackbar } from "@mui/material";
export default function TeacherDashboard() {
  const [isUpdate, setIsUpdate] = useState(0);
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
  }, [getData, isUpdate]);

  const activeUser = async (userID, isApprove) => {
    try {
      await axiosInstance
        .get(`user/Get_Approved_User/${userID}/${isApprove}`)
        .then((res) => {
          if (res.data) {
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
  const teacherItem = (teacher, index) => {
    return (
      <div key={index} className="item-list">
        <div
          className="d-flex w-25 justify-content-start teacher--detail"
          style={{}}
        >
          <img
            src={`http://127.0.0.1:9000/${teacher.image}`}
            alt={teacher.name}
          />
          <span>{teacher.name}</span>
        </div>
        <div className="w-25">
          <span>{teacher.email}</span>
        </div>

        <div style={{ width: "150px" }}>
          <span style={{ color: teacher.isApprove ? "green" : "red" }}>
            {teacher.isApprove ? (
              <BiCheckCircle fontSize={"20"} />
            ) : (
              <BiXCircle fontSize={"20"} />
            )}
            Approve
          </span>
        </div>

        <div style={{ width: "100px" }} className="action--button">
          {teacher.isApprove ? (
            <Button
              variant="danger"
              size="sm"
              style={{ width: "100px" }}
              onClick={() => {
                activeUser(teacher.id, 0);
              }}
            >
              Block
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              style={{ width: "100px" }}
              onClick={() => {
                activeUser(teacher.id, 1);
              }}
            >
              Approve
            </Button>
          )}
        </div>
      </div>
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
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Done"
      />
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
    </>
  );
}
