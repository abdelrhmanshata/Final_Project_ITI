import {
  Button,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import StudentReviews from "./StudentReviews";
import HoverRating from "./Lesson/HoverRating";
import { axiosInstance } from "api/config";

export default function Reviews({ course }) {
  const [value, setValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [ratingRange, setRatingRange] = useState({});
  const [totalRating, setTotalRating] = useState(0);

  const getData = useCallback(async () => {
    await axiosInstance
      .get(`review/course/${course.id}/score/count/`)
      .then((res) => {
        setRatingRange(res.data.count_by_range);
        const sumValues = Object.values(res.data.count_by_range).reduce(
          (acc, value) => acc + value,
          0
        );
        setTotalRating(sumValues);
      })
      .catch((err) => console.log(err));
  }, [course]);

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      courseReviewScore: value,
      reviewText: reviewText,
    };

    try {
      const response = await axiosInstance.post(
        `review/review_for_course/${localStorage.getItem("User_ID")}/${
          course.id
        }/`,
        review
      );
      if (response.status === 200) {
        // navigate(`/profile`);
        setReviewText("");
        setValue(0);
      }
    } catch (error) {
      // Handle error (e.g., display error message to the user)
      console.log(error);
    }
  };

  const setReviewValue = (value) => {
    setValue(value);
  };

  return (
    <>
      <Typography component="div" className="d-flex flex-column py-4">
        <Typography gutterBottom variant="h4" component="div">
          Student feedback
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper
              elevation={5}
              className="d-flex flex-column align-items-center justify-content-center p-4"
            >
              <Typography gutterBottom variant="h4" component="div">
                {course.courseReviewScore}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Course rating
              </Typography>
              <Rating
                name="read-only"
                value={course.courseReviewScore}
                readOnly
              />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={5} className="p-1">
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={(ratingRange["4-5"] / totalRating) * 100}
                    label={`${(ratingRange["4-5"] / totalRating) * 100}%`}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={5} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">{ratingRange["4-5"]}</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={(ratingRange["3-4"] / totalRating) * 100}
                    label={`${(ratingRange["3-4"] / totalRating) * 100}%`}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={4} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">{ratingRange["3-4"]}</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={(ratingRange["2-3"] / totalRating) * 100}
                    label={`${(ratingRange["2-3"] / totalRating) * 100}%`}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={3} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">{ratingRange["2-3"]}</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={(ratingRange["1-2"] / totalRating) * 100}
                    label={`${(ratingRange["1-2"] / totalRating) * 100}%`}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={2} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">{ratingRange["1-2"]}</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={(ratingRange["0-1"] / totalRating) * 100}
                    label={`${(ratingRange["0-1"] / totalRating) * 100}%`}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={1} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">{ratingRange["0-1"]}</span>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Paper className="mt-4 p-4">
          <div className="d-flex flex-column gap-2">
            <Typography variant="h5">Add Reviews & Rate</Typography>
            <Typography variant="body2">What is it like to Course?</Typography>

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
        </Paper>
        <br />
        <Typography component="div" className="d-flex bg-primary">
          <StudentReviews course={course} />
        </Typography>
      </Typography>
    </>
  );
}
