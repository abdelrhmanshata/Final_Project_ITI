import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "api/config";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function EditVideo({ video }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

  const [updateVideo, setUpdateVideo] = useState(video);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `course/section/updateAVideo/${video.id}`,
        updateVideo
      );
      // Handle success (e.g., show success message to the user)
      if (response.status === 200) {
        console.log(response.data.message);
        handleCloseDialog();
        dispatch(updateState(isUpdate + 1));
      }
    } catch (error) {
      // Handle error (e.g., display error message to the user)
      console.log(error.message);
    }
  };
  const handleChange = (event) => {
    setUpdateVideo({ ...updateVideo, [event.target.name]: event.target.value });
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
        <EditIcon style={{ fontSize: 16 }} />
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Update Video</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name for the video:</DialogContentText>
          <div className="d-flex flex-column gap-2">
            <TextField
              label="Video Title"
              name="videoTitle"
              value={updateVideo.videoTitle}
              onChange={handleChange}
            />
            <TextField
              label="Video Description"
              name="videoDescription"
              value={updateVideo.videoDescription}
              onChange={handleChange}
            />
            <TextField
              label="Video Link"
              name="videoLink"
              value={updateVideo.videoLink}
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
    </>
  );
}
