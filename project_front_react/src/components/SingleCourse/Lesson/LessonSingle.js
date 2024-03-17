import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Curriculum from "../CourseCurriculum/index";
import VideoPlayer from "./VideoPlayer";
import Footer from "components/Footer";
import { axiosInstance } from "api/config";
import Questions from "components/Questions";
import Navbar from "components/Navbar";

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
      <Navbar active={"Back"} data={data} />
      <br />
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Paper>
              <VideoPlayer />
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className="p-2">
              <Curriculum course={data} isPlay={true} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} marginTop={2}>
          <Grid item md={8} xs={12}>
            <Paper className="p-2">
              <Typography variant="h4">Questions</Typography>
              <Questions courseID={params.courseID} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      {/* Footer */}
      <Footer />
    </>
  );
}
