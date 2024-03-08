import React from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Curriculum from "../Curriculum";
import VideoPlayer from "./VideoPlayer";
import Footer from "components/Footer";
import HoverRating from "./HoverRating";

export default function LessonSingle() {
  const navigate = useNavigate();

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
          <h3 className="text-light">User Interface Design Essentials</h3>
        </div>
        <div className="col-md-3 col-12 text-end">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/course/1");
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
              <VideoPlayer videoId={"9r-BoGoZWVs"} />
            </Paper>
           
          </Grid>
          <Grid item xs={4}>
            <Paper className="p-2">
              <Curriculum />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
