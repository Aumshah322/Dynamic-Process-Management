import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CustomAccordion from './FormField/FormAccordion';
import ActionAccordion from './FormAction/ActionAccordion';


const EditDialog = ({ open, user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    // Update the editedUser state when the user prop changes
    setEditedUser({ ...user });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Add logic to save the edited user
    // For simplicity, you can log the edited user details
    onSave(editedUser);
    console.log('Edited User:', editedUser);

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={editedUser.name || ''}
          onChange={handleInputChange}
          style={{ marginRight: "5px", width: '260px' }}
          margin="dense"
        />
<br></br><br></br>
        <TextareaAutosize
          name="description"
          label="description "
          value={editedUser.description || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            border: '1px solid black',
            marginBottom: '10px'
          }}
          minRows={3}
          placeholder="Description" 
        />



      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
      <CustomAccordion/>
      <ActionAccordion/>
    </Dialog>
  );
};

export default EditDialog;
