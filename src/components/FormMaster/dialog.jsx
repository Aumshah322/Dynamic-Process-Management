import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import CustomAccordion from './FormField/FormAccordion';
import ActionAccordion from './FormAction/ActionAccordion';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nameChange = (e) => {
    const enteredName = e.target.value;
    setNameError(enteredName.trim() === '');
  };

  const descriptionChange = (e) => {
    const enteredDescription = e.target.value;
    setDescriptionError(enteredDescription.trim() === '');
  };

  

  // const handleSave = () => {
  //   // Check if name and description are valid
  //   if (!nameError && !descriptionError) {
  //     // Show accordion if validation passes
  //     setShowAccordion(true);
  //   }
  // };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          marginLeft: '735px',
          marginTop: '5px',
          backgroundColor: 'blue',
          color: 'white',
          textTransform: 'capitalize',
        }}
      >
        Add User
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg" fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { name, description } = formJson;

            // Check if name and description are empty
            if (!name || !description) {
              setNameError(!name);
              setDescriptionError(!description);
              return;
            }

            setShowAccordion(true);

            // Close dialog after submitting form
            // handleClose();

            // Navigate to '/formMaster' with formJson data
            navigate('/formMaster', { state: { formJson } });
          },

        }}
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Add Form <CancelIcon onClick={handleClose} /></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            style={{ width: '100%', border: '1px solid black', marginBottom: '10px' }}
            variant="outlined"
            onChange={nameChange}
            error={nameError}
            helperText={nameError ? 'First Name required' : ''}
          />
          <TextareaAutosize
            autoFocus
            margin="dense"
            id="description"
            name="description"
            placeholder="Description"
            style={{ width: '100%', border: '1px solid black', marginBottom: '10px' }}
            onChange={descriptionChange}
            error={descriptionError}
            minRows={3}
          />
          {descriptionError && (
            <div style={{ color: 'red', fontSize: '12px' }}>
              Description required
            </div>
          )}



        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" style={{ textTransform: 'capitalize' }}>Cancel</Button>
          <Button type="submit" variant="contained"  style={{ textTransform: 'capitalize' }}>Save</Button>
        </DialogActions>
        {/* Conditionally render the accordion */}
        {showAccordion && (
          <>
            <CustomAccordion/>
            <ActionAccordion/>
           </>
       
          )}
      </Dialog>
    </React.Fragment>
  );
}
