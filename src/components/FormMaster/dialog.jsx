import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';import { useNavigate } from 'react-router-dom';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
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
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { name, userName, description } = formJson;

            if (!name|| !description) {
              setNameError(!name);
              setDescriptionError(!description);
              return;
            }

            handleClose();
            navigate('/formMaster', { state: { formJson } });
          },
        }}
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Add Form <CancelIcon  onClick={handleClose} ></CancelIcon></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            style={{ width: '100%',  border: '1px solid black',marginBottom: '10px' }}
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
  style={{
    width: '100%',
    border: '1px solid black',
    marginBottom: '10px'
  }}
  onChange={descriptionChange}
  error={descriptionError ? 'true' : undefined}
  minRows={3}
/>
{descriptionError && (
  <div style={{ color: 'red', fontSize: '12px' }}>
    Description required
  </div>
)}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ textTransform: 'capitalize' }}>Cancel</Button>
          <Button type="submit" style={{ textTransform: 'capitalize' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
