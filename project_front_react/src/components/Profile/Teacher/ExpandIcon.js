import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "api/config";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Snackbar,
  Typography,
} from "@mui/material";
import ListSection from "./ListSection";
import ListQuestions from "./Question/ListQuestions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function ExpandIcon({ courseId }) {
  const [isUpdate, setIsUpdate] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  // Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // Section
  const [isSectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [section, setSection] = useState({
    courseID: courseId,
    sectionName: "",
  });

  const addNewSection = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `course/${courseId}/addASection/`,
        section
      );
      if (response.status === 200) {
        setMessage(response.data.message);
        handleSectionDialogClose();
        setIsUpdate(isUpdate + 1);
      }
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  const handleAddSection = () => {
    setSectionDialogOpen(true);
  };

  const handleSectionDialogClose = () => {
    setSectionDialogOpen(false);
  };

  // Question
  const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [question, setQuestion] = useState({
    courseID: courseId,
    questionHead: "",
  });

  const addNewQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `course/${courseId}/addAQuestion/`,
        question
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        handleQuestionDialogClose();
        setIsUpdate(isUpdate + 1);
      }
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  const handleAddQuestion = () => {
    setQuestionDialogOpen(true);
  };

  const handleQuestionDialogClose = () => {
    setQuestionDialogOpen(false);
  };

  return (
    <div>
      <Accordion className="mt-2">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`panel-content`}
          id={`panel-header`}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <Typography>Sections...</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ListSection
            courseId={courseId}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion className="mt-2">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`panel-content`}
          id={`panel-header`}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <Typography>Questions...</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ListQuestions
            courseId={courseId}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        </AccordionDetails>
      </Accordion>

      <div className="d-flex flex-row justify-content-center align-items-center gap-4">
        <Button
          onClick={handleAddSection}
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Add Section
        </Button>

        {/*  Add Section */}
        <Dialog open={isSectionDialogOpen} onClose={handleSectionDialogClose}>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name for the new section:
            </DialogContentText>
            <TextField
              label="Section Name"
              onChange={(event) => {
                setSection({ ...section, sectionName: event.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSectionDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={addNewSection} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={handleAddQuestion}
          variant="contained"
          color="success"
          style={{ marginTop: "10px" }}
        >
          Add Question
        </Button>
        <Dialog open={isQuestionDialogOpen} onClose={handleQuestionDialogClose}>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name for the new Question:
            </DialogContentText>
            <TextField
              label="Question Name"
              onChange={(event) => {
                setQuestion({ ...question, questionHead: event.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleQuestionDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={addNewQuestion} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* 
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      /> */}
    </div>
  );
}
