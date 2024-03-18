import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { axiosInstance } from "api/config";
import ListAnswer from "./ListAnswer";

import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Questions({ courseID }) {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${courseID}/questions/all/`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setQuestions(res.data.message);
          } else {
            setQuestions([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [courseID]);

  useEffect(() => {
    getData();
  }, [courseID]);

  //
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {questions.map((item) => (
        <Accordion key={item.id} className="mt-2">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel-content`}
            id={`panel-header`}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <Typography>{item.question.questionHead}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "10px" }}
            >
              <ListAnswer
                answers={item.answers}
                score={score}
                setScore={setScore}
                style={{ width: "100%" }}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="my-2 text-center">
        <Button variant="contained" onClick={handleClickOpen}>
          Submit
        </Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Congratulations"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Congratulations on your {score}! Your hard work and dedication have
            paid off, and I'm thrilled to see your success. Keep up the
            excellent work and continue to strive for even greater achievements.
            Remember, every challenge is an opportunity to learn and grow. Best
            of luck on your future endeavors!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
