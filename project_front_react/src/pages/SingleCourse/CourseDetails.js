import React, { useState } from "react";
import { Alert, Button, Fab, Paper, Rating, Snackbar } from "@mui/material";
import { Image } from "react-bootstrap";
import { BiSolidRightArrow, BiStar } from "react-icons/bi";
import { MdOutlineAccessTime, MdOutlineOndemandVideo } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { GrCurrency } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "api/config";

export default function CourseDetails({ data, ratingValue }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState("");
  const enrollCourse = async () => {
    //
    await axiosInstance
      .post(
        `review/students/${localStorage.getItem("User_ID")}/enroll/${data.id}/`
      )
      .then((res) => {
        setMessage(res.data.message);
        setStatus(res.data.status);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status?"success":"error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Paper className="p-2">
        <div className="position-relative">
          <Image
            width={"100%"}
            height={250}
            src={data.courseImage}
            rounded
            className="border border-2 border-primary"
          />
          <div className="position-absolute top-50 start-50 translate-middle">
            <Fab color="primary" onClick={() => navigate(`/lesson/${data.id}`)}>
              <BiSolidRightArrow size={24} />
            </Fab>
          </div>
        </div>
        <div className="d-flex flex-column p-4 gap-3">
          <Button
            className="bg-primary"
            variant="contained"
            onClick={() => navigate(`/payment/${data.id}`)}
          >
            Buy Now
          </Button>
          <Button variant="contained" color="warning" onClick={enrollCourse}>
            Enroll
          </Button>
        </div>
        <div className="d-flex flex-column p-4 gap-3">
          <div className="d-flex align-items-center gap-2">
            <MdOutlineAccessTime size={20} />
            <span className="w-50">Duration</span>
            <span className="w-50 text-end">{data.courseHours} h</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MdOutlineOndemandVideo size={20} />
            <span className="w-50">Lectures</span>
            <span className="w-50 text-end">{data.courseLessons}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <BsCalendarDate size={20} />
            <span className="w-50">Created</span>
            <span className="w-50 text-end">{data.courseDate}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <GrCurrency size={20} />
            <span className="w-50">Price</span>
            <span className="w-50 text-end">{data.coursePrice} $</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <BsCalendarDate size={20} />
            <span className="w-50">Created</span>
            <span className="w-50 text-end">{data.courseDate}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <BiStar size={20} />
            <span className="w-50">Rating</span>
            <span className="w-50 text-end">
              <Rating name="read-only" value={ratingValue} readOnly />
            </span>
          </div>
        </div>
      </Paper>
    </>
  );
}
