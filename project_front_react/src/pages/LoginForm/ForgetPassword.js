import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "api/config";

const ForgetPassword = ({ open, handleClose, notify }) => {
  const [email, setEmail] = useState("");
  const data = {
    email: email,
  };
  const sendEmail = async () => {
    if (!email) {
      notify("Enter Your Email");
      return;
    }
    try {
      const response = await axiosInstance.post("user/forgot", data);
      if (response.status === 200) {
        notify(response.data.message);
        handleClose();
      }
    } catch (error) {
      console.log(error);
      notify(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forget Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Your Email</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            variant="standard"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendEmail}>Send</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ForgetPassword;
