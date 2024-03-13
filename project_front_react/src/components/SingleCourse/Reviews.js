import {
  Button,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import StudentReviews from "./StudentReviews";
import HoverRating from "./Lesson/HoverRating";

export default function Reviews() {
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
              style={{}}
            >
              <Typography gutterBottom variant="h4" component="div">
                4.93
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Course rating
              </Typography>
              <Rating name="read-only" value={5} readOnly />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={5} className="p-1">
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={80}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={5} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">4132</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={60}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={4} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">3025</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={45}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={3} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">855</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={35}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={2} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">250</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-space-between">
                <div className="w-50">
                  <ProgressBar
                    animated
                    now={15}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="w-50 text-center">
                  <Rating name="read-only" value={1} readOnly />
                </div>
                <div className="text-center" style={{ width: "100px" }}>
                  <span className="fw-bold">10</span>
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
            <HoverRating />
            <TextField fullWidth label="Reviews" multiline rows={5} />
            <Button variant="contained">Submit Review</Button>
          </div>
        </Paper>
        <br />
        <Typography component="div" className="d-flex bg-primary">
          <StudentReviews />
        </Typography>
      </Typography>
    </>
  );
}
