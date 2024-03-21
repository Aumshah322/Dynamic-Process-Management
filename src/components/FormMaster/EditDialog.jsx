import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CancelIcon from '@mui/icons-material/Cancel';


const EditDialog = ({ open, user, onSave, onClose, mode }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const dialogTitle = mode === 'add' ? 'Add New Form' : 'Edit Form';
  const [controlType, setControlType] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isRequired, setIsRequired] = useState('');
  const [isDisabled, setIsDisabled] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...editedUser,
      formfields: data,
      
    }
    onSave(updatedUser);
    console.log(updatedUser);
    // onClose(); 
  };

  const controlTypeChange = (event) => {
    setControlType(event.target.value);
  };

  const displayOrderChange = (event) => {
    setDisplayOrder(event.target.value);
  };

  const isRequiredChange = (event) => {
    setIsRequired(event.target.value);
  };

  const isDisabledChange = (event) => {
    setIsDisabled(event.target.value);
  };

  const fieldNameChange = (event) => {
    setFieldName(event.target.value);
  };

  const maxLengthChange = (event) => {
    setMaxLength(event.target.value);
  };

  const defaultValueChange = (event) => {
    setDefaultValue(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedRows = data.filter(row => row.id !== id);
    setData(updatedRows);
    onDataChange(updatedRows);
  };

  const handleSave1 = () => {


    if (selectedRow) {
      const updatedRows = data.map(row => {
        if (row.id === selectedRow.id) {
          return {
            ...row,
            controlType,
            displayOrder,
            isRequired,
            isDisabled,
            fieldName,
            maxLength,
            defaultValue
          };
        }
        return row;
      });
      setData(updatedRows);
      setSelectedRow(null);
      //console.log(updatedRows);
    } else {
      const displayOrderExists = data.some(row => row.displayOrder === displayOrder);

      if (displayOrderExists) {
        alert("Display Order must be unique.");
        return;
      }
      const newRow = {
        id: Math.random(),
        controlType,
        displayOrder,
        isRequired,
        isDisabled,
        fieldName,
        maxLength,
        defaultValue
      };
      setData([...data, newRow]);
      console.log((newRow));
      
    }
  

  };


  const clearFields = () => {
    setDisplayOrder('');
    setControlType('');
    setIsRequired('');
    setIsDisabled('');
    setFieldName('');
    setMaxLength('');
    setDefaultValue('');
    setSelectedRow(null);
  };


  const handleEdit = (row) => {
    setSelectedRow(row);
    setControlType(row.controlType);
    setDisplayOrder(row.displayOrder);
    setIsRequired(row.isRequired);
    setIsDisabled(row.isDisabled);
    setFieldName(row.fieldName);
    setMaxLength(row.maxLength);
    setDefaultValue(row.defaultValue);
  };

  const columns = [
    { field: 'displayOrder', headerName: 'Display Order', width: 120 },
    { field: 'fieldName', headerName: 'Field Name', width: 450 },
    { field: 'controlType', headerName: 'Control Type', width: 450 },
    {
      field: 'Action', headerName: 'Action', width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </>
      )
    }
  ];

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);


  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize: '22px' }}>
        {dialogTitle}
        <CancelIcon onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <TextField
          label="name"
          name="name"
          value={editedUser.name || ''}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          value={editedUser.description || ''}
          onChange={handleInputChange}
          style={{ marginTop: '5px' }}
          fullWidth
          margin="dense"
        />


      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} style={{ fontWeight: 700 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} style={{ fontWeight: 700 }}>
          Save
        </Button>
      </DialogActions>
      <div>
        <div style={{ width: '100%' }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Form Fields
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <TextField id="displayOrder" label="Display Order" variant="outlined" disabled={!!selectedRow} value={displayOrder} type="number" onChange={displayOrderChange} style={{ marginRight: "15px" }} />
                <FormControl>
                  <InputLabel id="controlType">Control Type</InputLabel>
                  <Select
                    labelId="controlType"
                    id="control-select"
                    value={controlType}
                    onChange={controlTypeChange}
                    style={{ marginRight: "15px" }}
                  >
                    <MenuItem value="picklist">picklist</MenuItem>
                    <MenuItem value="multiple picklist">multiple picklist</MenuItem>
                    <MenuItem value="checkbox">checkbox</MenuItem>
                    <MenuItem value="multiple checkbox">multiple checkbox</MenuItem>
                    <MenuItem value="textfield">textfield</MenuItem>
                    <MenuItem value="datepicker">datepicker</MenuItem>
                    <MenuItem value="date-timepicker">date-timepicker</MenuItem>
                    <MenuItem value="textarea">textarea</MenuItem>
                  </Select>
                </FormControl>
                <TextField id="fieldName" label="Field Name" variant="outlined" onChange={fieldNameChange} value={fieldName} style={{ marginRight: "15px" }} />
                <FormControl>
                  <InputLabel id="isRequired">Is Required</InputLabel>
                  <Select
                    labelId="isRequired"
                    id="isRequired-select"
                    value={isRequired}
                    onChange={isRequiredChange}
                    style={{ marginRight: "15px" }}
                  >
                    <MenuItem value={10}>yes</MenuItem>
                    <MenuItem value={20}>no</MenuItem>
                  </Select>
                </FormControl>
                <FormControl >
                  <InputLabel id="isDisabled">Is Disabled</InputLabel>
                  <Select
                    labelId="isDisabled"
                    id="isDisabled-select"
                    value={isDisabled}
                    onChange={isDisabledChange}
                    style={{ marginRight: "15px" }}
                  >
                    <MenuItem value={10}>yes</MenuItem>
                    <MenuItem value={20}>no</MenuItem>
                  </Select>
                </FormControl>
                <div className="sRow" style={{ marginTop: '5px' }}>
                  <TextField id="maxLength" label="Max Length" variant="outlined" onChange={maxLengthChange} value={maxLength} style={{ marginRight: "15px" }} />
                  <TextField id="defaultValue" label="Default Value" variant="outlined" onChange={defaultValueChange} value={defaultValue} style={{ marginRight: "15px" }} />
                </div>
                <div className="but" style={{ marginTop: '15px', textAlign: 'left', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleSave1} variant="contained" style={{ marginRight: '5px' }}>Save</Button>
                  <Button onClick={clearFields} variant="contained">Add</Button>
                </div>
              </div>
            </AccordionDetails>
            <DataGrid rows={data} columns={columns} />
          </Accordion>

        </div>

      </div>

    </Dialog>
  );
};

export default EditDialog;
