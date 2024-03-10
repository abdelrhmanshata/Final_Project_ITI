import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditSection({ section, onSectionNameEdited }) {
  const [newSectionName, setNewSectionName] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setNewSectionName(section.name);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveSectionName = () => {
    onSectionNameEdited(section.id, newSectionName);
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    setNewSectionName(event.target.value);
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        color="primary"
        variant="text"
        aria-label="edit section name"
        style={{ padding: '0 4px', minWidth: 'auto' }} 
      >
        <EditIcon  style={{ fontSize: 16}} />
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Section Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new name for the section:
          </DialogContentText>
          <TextField
            label="New Section Name"
            value={newSectionName}
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
      </Dialog>
    </>
  );
}
