import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ExpandIcon from "./ExpandIcon";
import './Alert.css';
import { MdEdit, MdOutlineDeleteForever, MdRemoveRedEye } from "react-icons/md";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Snackbar,
} from "@mui/material";
import { axiosInstance } from "api/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddRequirement from "./Other/AddRequirement";

import YouLearn from "./Other/YouLearn";
import ListRequirement from "./Other/ListRequirement";
import ListSkillsWillLearn from "./Other/ListSkillsWillLearn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";
import Swal from "sweetalert2";
export default function CardCourse({ course }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleShow = (id) => {
    navigate(`/course/${id}`);
  };

  const handleUpdate = async () => {};

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: '#d33',
      cancelButtonText: "No, cancel!",
      cancelButtonColor: '#198754',

      reverseButtons: true,

     

    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.get(`/course/deleteACourse/${course.id}`);
          setMessage("Your file has been deleted.");
          setOpen(true);
          dispatch(updateState(isUpdate + 1));
        } catch (error) {
          console.log(error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setMessage("Your imaginary file is safe :)");
        setOpen(true);
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Card sx={{ width: 350, maxWidth: 350 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image={`http://127.0.0.1:9000/${course.courseImage}`}
      />
      <CardContent>
        <div className="position-relative mb-5">
          <div className="position-absolute top-0 start-50 translate-middle d-flex flex-row gap-3 ">
            <IconButton
              style={{ width: "50px", height: "50px" }}
              color="light bg-light"
              aria-label="search"
            >
              <AddRequirement courseId={course.id} />
            </IconButton>
            <IconButton
              style={{ width: "50px", height: "50px" }}
              color="light bg-light"
              aria-label="search"
            >
              <MdEdit
                color="gray"
                fontSize={24}
                onClick={() => {
                  navigate(`/UpdateCourse/${course.id}`);
                }}
              />
            </IconButton>
            <IconButton
              style={{ width: "50px", height: "50px" }}
              color="light bg-light"
              aria-label="search"
            >
              <MdRemoveRedEye
                color="blue"
                fontSize={24}
                onClick={() => {
                  navigate(`/course/${course.id}`);
                }}
              />
            </IconButton>

            <IconButton
              style={{ width: "50px", height: "50px" }}
              color="light bg-light"
              aria-label="search"
            >
              <MdOutlineDeleteForever
                color="red"
                fontSize={24}
                onClick={handleDelete}
              />
            </IconButton>

            <IconButton
              style={{ width: "50px", height: "50px" }}
              color="light bg-light"
              aria-label="search"
            >
              <YouLearn courseId={course.id} />
            </IconButton>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h7" component="div">
            {course.courseName}
          </Typography>
          <Typography variant="h7" color="text.primary">
            $ {course.coursePrice}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {course.courseDescription}
        </Typography>
        <Accordion className="mt-2">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel-content`}
            id={`panel-header`}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <Typography>Requirement...</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "10px" }}
            >
              <ListRequirement courseId={course.id} style={{ width: "100%" }} />
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "10px" }}
            >
              <ListSkillsWillLearn
                courseId={course.id}
                style={{ width: "100%" }}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: "10px" }}
        >
          <ExpandIcon courseId={course.id} style={{ width: "100%" }} />
        </Typography>
      </CardContent>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </Card>
  );
}
