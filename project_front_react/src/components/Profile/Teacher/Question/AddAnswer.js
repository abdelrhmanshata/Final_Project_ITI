import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "api/config";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function AddAnswer({ questionID }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

  const [answerText, setAnswerText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveAnswer = async (e) => {
    e.preventDefault();

    const obj = {
      questionID: questionID,
      answerText: answerText,
      isAnswer: isChecked,
    };

    try {
      const response = await axiosInstance.post(
        `course/addAnAnswer/${questionID}/`,
        obj
      );

      if (response.status === 200) {
        console.log(response.data.message);
        handleCloseDialog();
        dispatch(updateState(isUpdate + 1));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        color="primary"
        variant="text"
        aria-label="add Answer"
        style={{ padding: "0 12px", minWidth: "auto" }}
      >
        <AddIcon style={{ fontSize: 20 }} />
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Answer</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Answer:</DialogContentText>
          <div className="d-flex flex-column gap-2">
            <TextField
              label="Answer Text"
              name="answerText"
              onChange={(e) => {
                setAnswerText(e.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  name="isAnswer"
                  checked={isChecked}
                  onChange={(event) => {
                    setIsChecked(event.target.checked);
                  }}
                />
              }
              label="Is Answer"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveAnswer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
