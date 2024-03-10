import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function DeleteSection({ onDeleteSection }) {
  const handleDelete = () => {
    onDeleteSection();
  };

  return (
    <Tooltip title="Delete Section">
     <IconButton color="primary" onClick={handleDelete} style={{ padding: '6px' }}>
  <DeleteIcon style={{ fontSize: 16 }} />
</IconButton>
    </Tooltip>
  );
}
