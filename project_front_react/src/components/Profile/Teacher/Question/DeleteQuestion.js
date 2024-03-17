import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { axiosInstance } from "api/config";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function DeleteQuestion({ questionID }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await axiosInstance
        .get(`/course/deleteASection/${sectionID}/`)
        .then((res) => {
          setMessage(res.data.message);
          setOpen(true);
          dispatch(updateState(isUpdate + 1));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Delete Section">
        <IconButton
          color="error"
          onClick={handleDelete}
          style={{ padding: "6px" }}
        >
          <DeleteIcon style={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
}
