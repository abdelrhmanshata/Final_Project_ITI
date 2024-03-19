import { Button, Typography } from "@mui/material";
import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { useNavigate, useParams } from "react-router-dom";
export default function ForgetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-primary">
      <Button
        style={{ position: "absolute", top: "30px", left: "30px" }}
        variant="contained"
        onClick={() => {
          navigate("/login");
        }}
      >
        Back To Login
      </Button>
      <ResetPasswordForm token={params.token} />
    </div>
  );
}
