import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, TextField, FormControl, TextareaAutosize, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function ActionAccordion() {
    const [controlType, setControlType] = useState('');
    const [displayOrder, setDisplayOrder] = useState('');
    const [isRequired, setIsRequired] = useState('');
    const [isDisabled, setIsDisabled] = useState('');
    const [text, settext] = useState('');
    const [failureMsg, setfailureMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    const [color, setcolor] = useState('');
    const [defaultValue, setDefaultValue] = useState('');
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const controlTypeChange = (event) => {
        setControlType(event.target.value);
    };

    const displayOrderChange = (event) => {
        setDisplayOrder(event.target.value);
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

    const handleDelete = (id) => {
        const updatedRows = data.filter(row => row.id !== id);
        setData(updatedRows);
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
                        text,
                        color,
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
                text,
                color,
                successMsg,
                failureMsg,
            };
            setData([...data, newRow]);
        }
    };


    const clearFields = () => {
        setDisplayOrder('');
        setControlType('');
        setIsRequired('');
        setIsDisabled('');
        settext('');
        setcolor('');
        setsuccessMsg('');
        setfailureMsg('');
        setSelectedRow(null);
    };


    const handleEdit = (row) => {
        setSelectedRow(row);
        setControlType(row.controlType);
        setDisplayOrder(row.displayOrder);
        settext(row.text);
        setcolor(row.color);
        setDefaultValue(row.successMsg);
        setDefaultValue(row.failureMsg);
    };

    const columns = [
        { field: 'displayOrder', headerName: 'Display Order', width: 150 },
        { field: 'text', headerName: 'text', width: 150 },
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
        <div style={{  width: '100%' }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Form Action
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
                                <MenuItem value="button">button</MenuItem>
                                <MenuItem value="submit">submit</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id="text" label="text" variant="outlined" onChange={textChange} value={text} />
                        <TextField id="color" label="Max Length" variant="outlined" onChange={colorChange} value={color} />
                        <TextareaAutosize
                            autoFocus
                            margin="dense"
                            id="successMsg"
                            name="successMsg"
                            placeholder="Success Message"
                            style={{ width: '100%', border: '1px solid black', marginBottom: '10px' }}
                            value={successMsg}
                            onChange={successMsgChange}
                            minRows={3}
                        />
                        <TextareaAutosize
                            autoFocus
                            margin="dense"
                            id="failureMsg"
                            name="failureMsg"
                            placeholder="failureMsg"
                            style={{ width: '100%', border: '1px solid black', marginBottom: '10px' }}
                            value={failureMsg}
                            onChange={failureMsgChange}
                            minRows={3}
                        />
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={clearFields}>Add</Button>
                    </div>
                </AccordionDetails>
                    <DataGrid rows={data} columns={columns} />
            </Accordion>

        </div>
    );
}
