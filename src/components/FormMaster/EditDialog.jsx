import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextareaAutosize, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CancelIcon from '@mui/icons-material/Cancel';


const EditDialog = ({ open, user, onSave, onClose, mode, isVisible }) => {
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
      formactions: dataAction,

    }
    onSave(updatedUser);

    onclose();
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

  const handleFormFieldSave = () => {
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

    }
    clearFields();
  };

  const handleDelete = (id) => {
    const updatedRows = data.filter(row => row.id !== id);
    setData(updatedRows);
    setSelectedRow(null);
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

    if (user && Array.isArray(user.formfields) && Array.isArray(user.formactions)) {
      setEditedUser({ ...user });
      setData([...user.formfields]);
      setdataAction([...user.formactions])// Update form fields from user prop
    }
  }, [user]);

 
  const [displayOrderAction, setdisplayOrderAction] = useState('');
  const [isRequiredAction, setisRequiredAction] = useState('');
  const [isDisabledAction, setisDisabledAction] = useState('');
  const [text, settext] = useState('');
  const [failureMsg, setfailureMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const [color, setcolor] = useState('');
  const [dataAction, setdataAction] = useState([]);
  const [controlTypeAction, setControlTypeAction] = useState('');


  const [selectedRowAction, setselectedRowAction] = useState(null);

  const controlTypeActionChange = (event) => {
    setControlTypeAction(event.target.value);
  };

  const displayOrderActionChange = (event) => {
    setdisplayOrderAction(event.target.value);
  };

  const failureMsgChange = (event) => {
    setfailureMsg(event.target.value);
  };

  const successMsgChange = (event) => {
    setsuccessMsg(event.target.value);
  };

  const textChange = (event) => {
    settext(event.target.value);
  };

  const colorChange = (event) => {
    setcolor(event.target.value);
  };

  const handleDeleteAction = (id) => {
    const updatedRows = dataAction.filter(row => row.id !== id);
    setdataAction(updatedRows);
    ondataActionChange(updatedRows)

  };

  const handleActionFieldSave = () => {


    if (selectedRowAction) {
      const updatedRows = dataAction.map(row => {
        if (row.id === selectedRowAction.id) {
          return {
            ...row,
            controlTypeAction,
            displayOrderAction,
            isRequiredAction,
            isDisabledAction,
            text,
            color,
          };
        }
        return row;

      });

      setdataAction(updatedRows);
      setselectedRowAction(null);
    } else {
      const displayOrderActionExists = dataAction.some(row => row.displayOrderAction === displayOrderAction);

      if (displayOrderActionExists) {
        alert("Display Order must be unique.");
        return;
      }
      const newRow = {
        id: Math.random(),
        controlTypeAction,
        displayOrderAction,
        text,
        color,
        successMsg,
        failureMsg,
      };
      setdataAction([...dataAction, newRow]);
      console.log(dataAction);
    }

    clearActionFields();
  };


  const clearActionFields = () => {
    setdisplayOrderAction('');
    setControlTypeAction('');
    setisRequiredAction('');
    setisDisabledAction('');
    settext('');
    setcolor('');
    setsuccessMsg('');
    setfailureMsg('');
    setselectedRowAction(null);
  };


  const handleEditAction = (row) => {
    setselectedRowAction(row);
    setdisplayOrderAction(row.displayOrderAction);
    setControlTypeAction(row.controlTypeAction);
    settext(row.text);
    setcolor(row.color);
    setsuccessMsg(row.successMsg);
    setfailureMsg(row.failureMsg);
  };


  const Actioncolumns = [
    { field: 'displayOrderAction', headerName: 'Display Order', width: 120 },
    { field: 'text', headerName: 'text', width: 450 },
    { field: 'controlTypeAction', headerName: 'Control Type', width: 450 },
    {
      field: 'Action', headerName: 'Action', width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditAction(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteAction(params.row.id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </>
      )
    }
  ];

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
      {(isVisible) && (
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
                    <Button onClick={handleFormFieldSave} variant="contained" style={{ marginRight: '5px' }}>Save</Button>
                    <Button onClick={clearFields} variant="contained">Add</Button>
                  </div>
                </div>
              </AccordionDetails>
              <DataGrid rows={data} columns={columns} />
            </Accordion>

          </div>
          <div style={{ width: '100%' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Form Action
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <TextField id="displayOrderAction" label="Display Order" style={{ marginRight: "15px" }} variant="outlined" disabled={!!selectedRowAction} value={displayOrderAction} type="number" onChange={displayOrderActionChange} />
                  <FormControl >
                    <InputLabel id="controlTypeAction">Control Type</InputLabel>
                    <Select
                      labelId="controlTypeAction"
                      id="control-select"
                      value={controlTypeAction}
                      onChange={controlTypeActionChange}
                      style={{ marginRight: "15px" }}
                    >
                      <MenuItem value="button">button</MenuItem>
                      <MenuItem value="submit">submit</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField id="text" label="text" variant="outlined" style={{ marginRight: "15px" }} onChange={textChange} value={text} />
                  <TextField id="color" label="color" variant="outlined" style={{ marginRight: "15px" }} onChange={colorChange} value={color} />
                  <div className="msg" style={{ marginTop: '15px' }}>
                    <TextareaAutosize
                      autoFocus
                      margin="dense"
                      id="successMsg"
                      name="successMsg"
                      placeholder="Success Message"
                      style={{ width: '500px', border: '1px solid black', marginBottom: '10px', marginRight: '15px' }}
                      value={successMsg}
                      onChange={successMsgChange}
                      minRows={2}
                    />
                    <TextareaAutosize
                      autoFocus
                      margin="dense"
                      id="failureMsg"
                      name="failureMsg"
                      placeholder="failureMsg"
                      style={{ width: '500px', border: '1px solid black', marginBottom: '10px' }}
                      value={failureMsg}
                      onChange={failureMsgChange}
                      minRows={2}
                    />
                  </div>
                  <div className="but" style={{ marginTop: '15px', textAlign: 'left', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleActionFieldSave} variant="contained" style={{ marginRight: '5px' }} >Save</Button>
                    <Button onClick={clearActionFields} variant="contained" >Add</Button>
                  </div>
                </div>
              </AccordionDetails>
              <DataGrid rows={dataAction} columns={Actioncolumns} />
            </Accordion>

          </div>
        </div>
      )}

    </Dialog>
  );
};

export default EditDialog;
