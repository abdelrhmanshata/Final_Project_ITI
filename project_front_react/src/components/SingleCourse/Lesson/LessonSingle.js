import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Curriculum from "../CourseCurriculum/index";
import VideoPlayer from "./VideoPlayer";
import Footer from "components/Footer";
import { axiosInstance } from "api/config";
import Questions from "components/Questions";

export default function LessonSingle() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses/${params.courseID}`)
        .then((res) => {
          setData(res.data.message[0]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {/* Navbar */}
      <div className="d-flex flex-wrap bg-dark p-4 align-items-center">
        <div className="col-md-3 col-12 text-center">
          <Link to="/" className="navbar-brand d-flex align-items-center px-4">
            <h2 className="m-0 text-light">
              <i className="fa fa-book me-3"></i>E-LEARNING
            </h2>
          </Link>
        </div>
        <div className="col-md-6 col-12 text-center">
          <h3 className="text-light">{data.courseName}</h3>
        </div>
        <div className="col-md-3 col-12 text-end">
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/course/${data.id}`);
            }}
          >
            Back To Course
          </Button>
        </div>
      </div>

      {/*  */}
      <Container fixed className="mt-5 mb-5 ">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className="p-2">
              <VideoPlayer />
            </Paper>
            <br />
            <Typography variant="h4">Questions</Typography>

            <Paper className="p-2">
              <Questions courseID={params.courseID} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="p-2">
              <Curriculum course={data} isPlay={true} />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
