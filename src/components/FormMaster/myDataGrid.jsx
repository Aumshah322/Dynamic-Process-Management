import { DataGrid } from '@mui/x-data-grid';
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
      