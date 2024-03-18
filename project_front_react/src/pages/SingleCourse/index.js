import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Container,
  Grid,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CourseInfoTab from "./CourseInfoTab";
import Footer from "components/Footer";
import CourseDetails from "./CourseDetails";
import { axiosInstance } from "api/config";
import { useDispatch, useSelector } from "react-redux";

export default function SingleCourse() {
  // const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate+1));

  const params = useParams();
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [userReview, setUserReview] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/details/${params.courseID}`)
        .then((res) => {
          setCourse(res.data);
          setUser(res.data.teacher);
          setRatingValue(res.data.courseReviewScore);
          setUserReview(res.data.teacher.teacher_avg_score);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [params.courseID]);

  useEffect(() => {
    getData();
  }, [params.courseID, isUpdate]);

  return (
    <>
      <Navbar />
      <Container fixed className="mt-5">
        <Grid container spacing={2}>
          <Grid item sm={12} md={8}>
            <div className="d-flex flex-column mb-5 gap-3">
              <Typography variant="h3" component="h2">
                {course.courseName}
              </Typography>
              <Typography variant="body2">
                Explore the Foundations of {course.courseName}
              </Typography>
            </div>
            <div className="row d-flex mb-3 align-items-center">
              <div className="col-md-2 col-12 mb-3  d-flex justify-content-center">
                <Avatar
                  alt={user.name}
                  src={`http://127.0.0.1:9000/${user.image}`}
                  sx={{ width: 100, height: 100 }}
                />
              </div>

              <div
                className="col-md-3 col-12 d-flex flex-md-column"
                style={{ alignItems: "center" }}
              >
                <Typography variant="h6">Created</Typography>
                <Typography
                  className="text-center "
                  style={{ flex: 1 }}
                  variant="body1"
                >
                  {user.name}
                </Typography>
              </div>

              <div
                className="col-md-4 col-12 d-flex flex-md-column"
                style={{ alignItems: "center" }}
              >
                <Typography variant="h6">Subject</Typography>
                <Typography
                  variant="body1"
                  className="text-center"
                  style={{ flex: 1 }}
                >
                  {user.subject}
                </Typography>
              </div>

              <div
                className="col-md-3 col-12 d-flex flex-md-column"
                style={{ alignItems: "center" }}
              >
                <Typography variant="h6">Review</Typography>
                <div className="d-flex flex-grow-1 justify-content-center">
                  <Rating name="read-only" value={userReview} readOnly />
                </div>
              </div>
            </div>
            {/* Tab Info */}
            <CourseInfoTab data={course} />
          </Grid>
          <Grid item sm={12} md={4}>
            <CourseDetails data={course} ratingValue={ratingValue} />
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
}
