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

export default function AddSection({ courseId }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

  // Section
  const [isSectionDialogOpen, setSectionDialogOpen] = useState(false);
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
      if (response.status === 200) {
        handleSectionDialogClose();
        dispatch(updateState(isUpdate + 1));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddSection = () => {
    setSectionDialogOpen(true);
  };

  const handleSectionDialogClose = () => {
    setSectionDialogOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleAddSection}
        color="primary"
        variant="text"
        aria-label="add video"
        style={{ padding: "0 12px", minWidth: "auto" }}
      >
        <AddIcon style={{ fontSize: 16 }} />
      </Button>
      <Dialog open={isSectionDialogOpen} onClose={handleSectionDialogClose}>
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
          <Button onClick={handleSectionDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addNewSection} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
