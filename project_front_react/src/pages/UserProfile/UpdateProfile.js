import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "api/config";
import { Snackbar } from "@mui/material";
import { useState } from "react";

export default function FormDialog({ email }) {
  const [open, setOpen] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      email: email,
      old_password: currentPassword,
      new_password: newPassword,
      confirm_password: newPassword,
    };

    try {
      const response = await axiosInstance.post("user/change-password/", obj);
      // Handle success (e.g., show success message to the user)
      if (response.status === 200) {
        console.log(response.data.message);
        handleClickSnackbar();
        setMessageSnackbar(response.data.message);
      }
      console.log(response.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(error);
      setMessageSnackbar(error);
    }
    handleClose();
    setCurrentPassword("");
    setNewPassword("");
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={messageSnackbar}
      />
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          backgroundColor: " #06bbcc",
          color: "white",
          fontSize: "6",
          padding: "5px",
          marginTop: "6px",
        }}
      >
        Update Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your current password and new password below.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Change Password</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
