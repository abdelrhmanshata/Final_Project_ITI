import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "api/config";
import { Snackbar, Typography } from "@mui/material";
import ListSection from "./ListSection";

export default function ExpandIcon({ courseId }) {
  const [isUpdate, setIsUpdate] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
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
      // Handle success (e.g., show success message to the user)
      if (response.status === 200) {
        // console.log(response.data.message);
        setMessage(response.data.message);
        handleDialogClose();
        setOpen(true);
        setIsUpdate(isUpdate + 1);
      }
    } catch (error) {
      // Handle error (e.g., display error message to the user)
      console.log(error.message);
      setMessage(error.message);
    }
  };

  const handleAddSection = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
     
      <ListSection
        courseId={courseId}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
      <Button
        onClick={handleAddSection}
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
      >
        Add Section
      </Button>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
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
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addNewSection} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
