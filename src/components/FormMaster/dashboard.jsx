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

function FDashboard() {
    const location = useLocation();
    const { formJson } = location.state || {};

    const [users, setUsers] = React.useState([
        {
            id: 1,
            name: 'React',
            description: 'React is a popular JavaScript library for building user interfaces, particularly for web applications. ',
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
                    name: formJson.name || '',
                    description: formJson.description || '',
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
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'description', headerName: 'Description', width: 1000 },
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
                <Typography style={{ fontSize: '25px', fontWeight: '600', position: 'static' }}>Form Master</Typography>
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

export default FDashboard;
