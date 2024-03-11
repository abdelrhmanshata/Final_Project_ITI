import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MovieIcon from '@mui/icons-material/Movie'; 
import Video from './Video';
import EditSection from './EditSection';
import DeleteSection from './DeleteSection';

export default function ExpandIcon() {
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);


  const handleAddSection = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveSection = () => {
    const newSection = {
      id: sections.length + 1,
      name: newSectionName,
    
       videoNames:[]
    };
    setSections([...sections, newSection]);
    setNewSectionName('');
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    setNewSectionName(event.target.value);
  };
  const handleVideoAdded = (videoName) => {
    const updatedSections = sections.map(section => {
      if (section.id === sections.length) {
        return { ...section, videoNames: [...section.videoNames, videoName] };
      }
      return section;
    });
    setSections(updatedSections);
  };
  


  const handleSectionNameEdited = (sectionId, newName) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, name: newName };
      }
      return section;
    });
    setSections(updatedSections);
  };
  const handleDeleteSection = (sectionId) => {
    const updatedSections = sections.filter(section => section.id !== sectionId);
    setSections(updatedSections);
  };

  return (
    <div>
      {sections.map((section) => (
        <Accordion key={section.id}>
   <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel${section.id}-content`}
            id={`panel${section.id}-header`}
          >
             <div style={{ position: 'relative', width: '100%' }}>
            <Typography>{section.name}</Typography>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <Video sectionId={section.id}  onVideoAdded={handleVideoAdded} />
           
                <EditSection
                  section={section}
                  onSectionNameEdited={handleSectionNameEdited}
                />
                <DeleteSection onDeleteSection={() => handleDeleteSection(section.id)} />
              </div>
              </div>
          </AccordionSummary>       
          <AccordionDetails>
         
          {section.videoNames.map((videoName, index) => (
  <div key={index} style={{ marginBottom: '5px' }}>
    <MovieIcon fontSize="small" /> 
    <span>{videoName}</span> 
  </div>
))}    
   
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        onClick={handleAddSection}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }} 
      >
        Add Section
      </Button>
    

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name for the new section:
          </DialogContentText>
          <TextField
            label="Section Name"
            value={newSectionName}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveSection} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}