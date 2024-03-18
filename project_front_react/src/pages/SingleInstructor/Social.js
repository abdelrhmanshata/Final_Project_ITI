import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { axiosInstance } from "api/config";
import HoverRating from "components/SingleCourse/Lesson/HoverRating";
import React from "react";
import { useState } from "react";
import { BiStar } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Socialprofile({ avatar, teacher }) {
  const [value, setValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const addReview = () => {
    setOpen(true);
  };
  const setReviewValue = (value) => {
    setValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      teacherReviewScore: value,
      reviewText: reviewText,
    };

    try {
      const response = await axiosInstance.post(
        `review/review_for_teacher/${localStorage.getItem("User_ID")}/${
          teacher.id
        }/`,
        review
      );
      if (response.status === 201) {
        setReviewText("");
        setValue(0);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center mb-5 mt-5 mb-md-3">
      <ul className="list-unstyled list-inline list-social mb-4 mb-md-0 mx-lg-3 order-1 order-md-0 font-size-sm">
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-facebook-f"></i>
          </Link>
        </li>
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-twitter"></i>
          </Link>
        </li>
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-instagram"></i>
          </Link>
        </li>
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-linkedin-in"></i>
          </Link>
        </li>
      </ul>
      <div className="border rounded-circle d-inline-block mb-4 mb-md-0 mx-lg-4 order-0">
        <div className="p-4">
          <img
            src={avatar}
            alt="..."
            className="rounded-circle img-fluid"
            width="170"
            height="170"
          />
        </div>
      </div>

      <div className="text-teal fw-medium d-flex align-items-center mx-lg-4 order-1 order-md-0">
        <BiStar color="orange" size={35} />
        <Button variant="text" onClick={addReview}>
          Add Review
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Reviews & Rate</DialogTitle>
        <DialogContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body2">What is it like to Teacher?</Typography>
            <HoverRating reviewValue={value} setReviewValue={setReviewValue} />
            <TextField
              name="reviewText"
              fullWidth
              label="Reviews"
              multiline
              rows={5}
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
              }}
            />

            <Button variant="contained" onClick={handleSubmit}>
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
