import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function Video({ onVideoAdded }) {
  const [newVideoName, setNewVideoName] = useState('');
  const [videoNames, setVideoNames] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveVideo = () => {
    const updatedVideoNames = [...videoNames]; 
    updatedVideoNames.push(newVideoName); 
    setVideoNames(updatedVideoNames);
    onVideoAdded(updatedVideoNames); 
    setNewVideoName('');
    setDialogOpen(false);
  };
  const handleChange = (event) => {
    setNewVideoName(event.target.value);
  };

  return (
    <>
      <Button
  onClick={handleOpenDialog}
  color="primary"
  variant="text"
  aria-label="add video"
  style={{ padding: '0 12px', minWidth: 'auto' }}
>
  <AddIcon style={{ fontSize: 16 }} />
</Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name for the new video:
          </DialogContentText>
          <TextField
            label="Video Name"
            value={newVideoName}
            onChange={handleChange}
          />
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