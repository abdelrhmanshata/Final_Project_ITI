import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "api/config";
import { MdAddchart } from "react-icons/md";

export default function YouLearn({ courseId }) {
  const [youLearn, setYouLearn] = useState({
    courseID: courseId,
    whatYoullLearnDescription: "",
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `course/${courseId}/addAWhatYoullLearn/`,
        youLearn
      );
      if (response.status === 200) {
        console.log(response.data.message);
        handleDialogClose();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddSection = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    setYouLearn({
      ...youLearn,
      whatYoullLearnDescription: event.target.value,
    });
  };

  return (
    <div>
      <Button
        onClick={handleAddSection}
        color="primary"
        variant="text"
        style={{ minWidth: "auto" }}
      >
        <MdAddchart style={{ fontSize: 16 }} />
      </Button>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Skills Learn</DialogTitle>
        <DialogContent>
          <TextField label="Skills Learn" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={save} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
