import React from 'react';
import { useLocation } from 'react-router-dom';
import MyDataGrid from './myDataGrid';
import { Typography } from '@mui/material';
import FormDialog from './dialog';

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

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'FirstName', width: 225 },
        { field: 'lastName', headerName: 'LastName', width: 220 },
        { field: 'userName', headerName: 'UserName', width: 250 },
        { field: 'email', headerName: 'Email', width: 275 },
        { field: 'phoneNumber', headerName: 'phoneNumber', width: 200 },
        { field: 'isActive', headerName: 'IsActive', width: 150 },
    ];

    return (
        <div>
            <div style={{ padding: 10, height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography style={{ fontSize: '25px', fontWeight: '600' }}>USER MANAGEMENT SYSTEM</Typography>
                <FormDialog />
            </div>
            <div>
                <MyDataGrid style={{ marginTop: '50px' }} users={users} columns={columns}></MyDataGrid>
            </div>
        </div>
    );
}

export default Dashboard;
