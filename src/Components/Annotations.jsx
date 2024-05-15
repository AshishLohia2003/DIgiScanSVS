import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Sr.No.'},
  { field: 'color', headerName: 'color'},
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'x',
    headerName: 'Position X',
  },
  {
    field: 'y',
    headerName: 'Position Y',
  },
  {
    field: 'w',
    headerName: 'Width',
  },
  {
    field: 'h',
    headerName: 'Hieght',
  },
  {
    field: 'type',
    headerName: 'Type',
  },
  {
    field: 'subtype',
    headerName: 'Subtype',
  },
  // {
  //   field: 'positions',
  //   headerName: 'Points'
  // }
];

export default function Annotation_Table({rows}) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
