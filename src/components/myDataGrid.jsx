import { DataGrid } from '@mui/x-data-grid';
import Dashboard from './dashboard';

// const rows = [
//     { id: 1, name: 'pk13@gmail.com', password: 'PalK2004', isActive: 'Active' },
//     { id: 2, name: 'domaid322@gmail.com', password: 'AumS322', isActive: 'Not Active' },
//   ];
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 90 },
  //   { field: 'firstName', headerName: 'FirstName', width: 150 },
  //   { field: 'lastName', headerName: 'LastName', width: 150 },
  //   { field: 'userName', headerName: 'UserName', width: 150 },
  //   { field: 'email', headerName: 'Email', width: 150 },
  //   { field: 'phoneNumber', headerName: 'phoneNumber', width: 90 },
  //   { field: 'isActive', headerName: 'IsActive', width: 150 },
  // ];
  const MyDataGrid = ({users, columns}) => {
    return (
      <div style={{ height: '400', width: '100%', margin: '450'}}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
        />
      </div>
    );
  };
  
  export default MyDataGrid;
      