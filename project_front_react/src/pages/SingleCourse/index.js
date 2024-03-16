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
  const dispatch = useDispatch();
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
  }, [params.courseID,isUpdate]);

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
            <div className="d-flex mb-3 gap-2 align-items-center">
              <Avatar
                alt={user.name}
                src={`http://127.0.0.1:9000/${user.image}`}
                sx={{ width: 80, height: 80 }}
              />
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Created by</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Subject</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Review</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style={{ borderBottom: "none" }}>
                      <TableCell style={{ borderBottom: "none" }}>
                        {user.name}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {user.subject}
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className="d-flex align-items-center gap-2"
                      >
                        <Rating name="read-only" value={userReview} readOnly />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
