import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import FormDialog from './dialog';
import MyDataGrid from './myDataGrid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from './EditDialog';
import HeaderBar from '../header/header';

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

    const [isInitialMount, setIsInitialMount] = React.useState(true);
    const [editableUser, setEditableUser] = React.useState(null);

    React.useEffect(() => {
        if (!isInitialMount && formJson && Object.keys(formJson).length > 0) {
            setUsers((prevUsers) => [
                ...prevUsers,
                {
                    id: prevUsers.length + 1,
                    firstName: formJson.firstName || '',
                    lastName: formJson.lastName || '',
                    userName: formJson.userName || '',
                    email: formJson.email || '',
                    phoneNumber: formJson.phoneNumber || '',
                    isActive: 'true',
                },
            ]);
        }
        setIsInitialMount(false);
    }, [formJson, isInitialMount]);

    const handleDelete = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

     
    const handleEdit = (user) => {
        setEditableUser(user);
      };
     
      const handleCloseEditDialog = () => {
        setEditableUser(null);
      };

      const handleSaveEdit = (editedUser) => {
        // Find the index of the user to be edited
        const userIndex = users.findIndex((user) => user.id === editedUser.id);
     
        if (userIndex !== -1) {
          // Update the user in the users state
          const updatedUsers = [...users];
          updatedUsers[userIndex] = editedUser;
          setUsers(updatedUsers);
        }
     
        // Reset editableUser state
        setEditableUser(null);
      };
     

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'FirstName', width: 220 },
        { field: 'lastName', headerName: 'LastName', width: 200 },
        { field: 'userName', headerName: 'UserName', width: 210 },
        { field: 'email', headerName: 'Email', width: 275 },
        { field: 'phoneNumber', headerName: 'phoneNumber', width: 200 },
        { field: 'isActive', headerName: 'IsActive', width: 150 },
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
        <div>
                  <HeaderBar />
            <div style={{ padding: 10, height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography style={{ fontSize: '25px', fontWeight: '600', position: 'static' }}>USER MANAGEMENT SYSTEM</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormDialog />
                </div>
            </div>
            <div>
                <MyDataGrid style={{ marginTop: '50px' }} users={users} columns={columns} />
               
            </div>
            <EditDialog
          open={Boolean(editableUser)}
          user={editableUser}
          onSave={handleSaveEdit}
          onClose={handleCloseEditDialog}
          // Add any other necessary props for the edit dialog
        />
        </div>
    );
}

export default Dashboard;
