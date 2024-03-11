import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
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

export default function SingleCourse() {
  const params = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    getData();
  });

  async function getData() {
    await axiosInstance
      .get(`course/listAllCourses/${params.courseID}`)
      .then((res) => {
        setCourse(res.data.message[0]);
      })
      .catch((err) => console.log(err));
  }

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
                alt="Remy Sharp"
                src={require("../../assets/img/team-0.jpg")}
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
                        <Typography variant="h6">Categories</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Review</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style={{ borderBottom: "none" }}>
                      <TableCell style={{ borderBottom: "none" }}>
                        AbdElrhman
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        Arabic
                      </TableCell>
                      <TableCell
                        style={{ borderBottom: "none" }}
                        className="d-flex align-items-center"
                      >
                        <Rating name="read-only" value={4} readOnly />
                        <Typography variant="span">
                          9.45 (9.8k+ reviews)
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/*  */}
            <CourseInfoTab data={course} />
            {/*  */}
          </Grid>
          <Grid item sm={12} md={4}>
            <CourseDetails data={course} />
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
}
