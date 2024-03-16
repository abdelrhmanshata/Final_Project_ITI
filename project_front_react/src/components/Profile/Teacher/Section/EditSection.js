import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";
import { axiosInstance } from "api/config";

export default function EditSection({ section, isUpdate, setIsUpdate }) {
  const [updateSection, setUpdateSection] = useState(section);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveSectionName = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `course/updateASection/${section.id}/`,
        updateSection
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
      console.log(error.message);
      setMessage(error.message);
    }
  };

  const handleChange = (event) => {
    setUpdateSection({ ...updateSection, sectionName: event.target.value });
  };

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
        aria-label="edit section name"
        style={{ padding: "0 4px", minWidth: "auto" }}
      >
        <EditIcon style={{ fontSize: 16 }} />
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Section Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new name for the section:
          </DialogContentText>
          <TextField
            label="Update Section Name"
            value={updateSection.sectionName}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveSectionName} color="primary">
            Save
          </Button>
        </DialogActions>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={message}
        />
      </Dialog>
    </>
  );
}
