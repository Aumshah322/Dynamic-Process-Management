import React from 'react';
import { useLocation } from 'react-router-dom';
import MyDataGrid from './myDataGrid';
import { Typography, IconButton } from '@mui/material';
import FormDialog from './dialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
    const location = useLocation();
    const { formJson } = location.state || {};
    
    const [users, setUsers] = React.useState([
        {
            id: 1,
            firstName: 'Aum',
            lastName: 'Shah',
            userName: 'AS',
            email: 'aum.shah@samyak.com',
            phoneNumber: '7046919433',
            isActive: true
        }
    ]);

    React.useEffect(() => {
        // Check if formJson is defined and contains the expected properties
        if (formJson && Object.keys(formJson).length > 0) {
            // Add the new user from formJson to the users array
            setUsers(prevUsers => [
                ...prevUsers,
                {
                    id: prevUsers.length + 1,
                    firstName: formJson.firstName || '', 
                    lastName: formJson.lastName || '',
                    userName: formJson.userName || '',
                    email: formJson.email || '',
                    phoneNumber: formJson.phoneNumber || '',
                    isActive: 'true'
                }
            ]);
        }
    }, [formJson]);

    const handleDelete = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'FirstName', width: 220 },
        { field: 'lastName', headerName: 'LastName', width: 200 },
        { field: 'userName', headerName: 'UserName', width: 210 },
        { field: 'email', headerName: 'Email', width: 275 },
        { field: 'phoneNumber', headerName: 'phoneNumber', width: 200 },
        { field: 'isActive', headerName: 'IsActive', width: 150 },
        { field: 'Action', headerName: 'Action', width: 150, 
          renderCell: (params) => (
            <>
              <IconButton><EditIcon /></IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}><DeleteOutlineIcon /></IconButton>
            </>
          ) 
        }
    ];

    return (
        <div>
            <div style={{ padding: 10, height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography style={{ fontSize: '25px', fontWeight: '600' }}>USER MANAGEMENT SYSTEM</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <FormDialog />
                </div>
            </div>
            <div>
                <MyDataGrid style={{ marginTop: '50px' }} users={users} columns={columns}></MyDataGrid>
            </div>
        </div>
    );
}

export default Dashboard;
