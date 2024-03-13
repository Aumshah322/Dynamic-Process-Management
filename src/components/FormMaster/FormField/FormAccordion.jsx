import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails,Button, TextField, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid} from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function CustomAccordion() {
  const [controlType, setControlType] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isRequired, setIsRequired] = useState('');
  const [isDisabled, setIsDisabled] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); 

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
    const updatedRows = data .filter(row => row.id !== id);
    setData (updatedRows);
  };

  const handleSave = () => {
    const displayOrderExists = data.some(row => row.displayOrder === displayOrder);
    
    if (displayOrderExists) {
        alert("Display Order must be unique.");
        return;
    }

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
    { field: 'displayOrder', headerName: 'Display Order', width: 150 },
    { field: 'fieldName', headerName: 'Field Name', width: 150 },
    { field: 'controlType', headerName: 'Control Type', width: 150 },
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
            <TextField id="displayOrder" label="Display Order" variant="outlined" disabled={!!selectedRow} value={displayOrder} type="number" onChange={displayOrderChange} />
            <FormControl fullWidth>
              <InputLabel id="controlType">Control Type</InputLabel>
              <Select
                labelId="controlType"
                id="control-select"
                value={controlType}
                onChange={controlTypeChange}
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
            <FormControl fullWidth>
              <InputLabel id="isRequired">Is Required</InputLabel>
              <Select
                labelId="isRequired"
                id="isRequired-select"
                value={isRequired}
                onChange={isRequiredChange}
              >
                <MenuItem value={10}>yes</MenuItem>
                <MenuItem value={20}>no</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="isDisabled">Is Disabled</InputLabel>
              <Select
                labelId="isDisabled"
                id="isDisabled-select"
                value={isDisabled}
                onChange={isDisabledChange}
              >
                <MenuItem value={10}>yes</MenuItem>
                <MenuItem value={20}>no</MenuItem>
              </Select>
            </FormControl>
            <TextField id="fieldName" label="Field Name" variant="outlined" onChange={fieldNameChange} value={fieldName} />
            <TextField id="maxLength" label="Max Length" variant="outlined" onChange={maxLengthChange} value={maxLength} />
            <TextField id="defaultValue" label="Default Value" variant="outlined" onChange={defaultValueChange} value={defaultValue} />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={clearFields}>Add</Button>
          </div>
        </AccordionDetails>
        <DataGrid rows={data } columns={columns} />
      </Accordion>

    </div>
  );
}
