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

export default function AddVideo({ sectionID, isUpdate, setIsUpdate }) {
  const [video, setVideo] = useState({
    sectionID: sectionID,
    videoTitle: "",
    videoDescription: "",
    videoLink: "",
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `course/section/${sectionID}/addAVideo/`,
        video
      );
      // Handle success (e.g., show success message to the user)
      if (response.status === 200) {
        // console.log(response.data.message);
        setMessage(response.data.message);
        handleCloseDialog();
        setOpen(true);
        setIsUpdate(isUpdate + 1);
      }
    } catch (error) {
      // Handle error (e.g., display error message to the user)
      // console.log(error.message);
      setMessage(error.message);
    }
  };
  const handleChange = (event) => {
    setVideo({ ...video, [event.target.name]: event.target.value });
  };
  // Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleOpenDialog}
        color="primary"
        variant="text"
        aria-label="add video"
        style={{ padding: "0 12px", minWidth: "auto" }}
      >
        <AddIcon style={{ fontSize: 16 }} />
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name for the new video:
          </DialogContentText>
          <div className="d-flex flex-column gap-2">
            <TextField
              label="Video Title"
              name="videoTitle"
              onChange={handleChange}
            />
            <TextField
              label="Video Description"
              name="videoDescription"
              onChange={handleChange}
            />
            <TextField
              label="Video Link"
              name="videoLink"
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveVideo} color="primary">
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
    </>
  );
}
