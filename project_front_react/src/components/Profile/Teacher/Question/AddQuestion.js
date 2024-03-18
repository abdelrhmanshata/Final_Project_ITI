import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";
import { axiosInstance } from "api/config";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function AddQuestion({ courseId }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

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
        handleQuestionDialogClose();
        dispatch(updateState(isUpdate + 1));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuestion = () => {
    setQuestionDialogOpen(true);
  };

  const handleQuestionDialogClose = () => {
    setQuestionDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleAddQuestion}
        color="primary"
        variant="text"
        aria-label="add video"
        style={{ padding: "0 12px", minWidth: "auto" }}
      >
        <AddIcon style={{ fontSize: 16 }} />
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
    </>
  );
}
