import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, TextField, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function CustomAccordion({formfield,onDataChange}) {
  const [controlType, setControlType] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isRequired, setIsRequired] = useState('');
  const [isDisabled, setIsDisabled] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [defaultValue, setDefaultValue] = useState('');

  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState(formfield || []);
 
  useEffect(() => {
    setData(formfield || []);
    //console.log(formfield);
  }, [formfield]);
 

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

  const handleSave = () => {


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
      onDataChange(updatedRows); 
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
      onDataChange([...data, newRow]);
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

  return (
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
            <div className="but" style={{marginTop:'15px',textAlign: 'left',display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleSave} variant="contained" style={{ marginRight: '5px' }}>Save</Button>
              <Button onClick={clearFields} variant="contained">Add</Button>
            </div>
          </div>
        </AccordionDetails>
        <DataGrid rows={data} columns={columns} />
      </Accordion>

    </div>
  );
}
