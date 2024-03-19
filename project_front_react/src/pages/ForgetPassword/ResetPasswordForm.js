import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { axiosInstance } from "api/config";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = ({ token }) => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setResetStatus("Please fill in all fields.");
      return;
    } else {
      setResetStatus("");
    }

    if (newPassword !== confirmPassword) {
      setResetStatus("Passwords do not match.");
      return;
    } else {
      setResetStatus("");
    }

    const obj = {
      token: token,
      password: newPassword,
      password_confirm: confirmPassword,
    };

    try {
      const response = await axiosInstance.post("user/reset", obj);
      // Handle success (e.g., show success message to the user)
      if (response.status === 200) {
        navigate("/login");
      }
      console.log(response.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      setResetStatus("An error occurred while resetting password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400 }}>
        <LockOutlinedIcon sx={{ fontSize: "large", mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reset Password
        </Typography>
        {resetStatus && <Typography color="error">{resetStatus}</Typography>}
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          className="mt-2"
          variant="contained"
          onClick={handleResetPassword}
          fullWidth
        >
          Reset Password
        </Button>
      </Paper>
    </Box>
  );
};

export default ResetPasswordForm;
