import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../assets/ag-grid-custom-icons.css';
import { useState } from 'react'; // Optional Theme applied to the grid

const Table = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { '#': 0, emails: 'maxdefaultman0@gmail.com', sent: true },
    { '#': 1, emails: 'maxdefaultman1@gmail.com', sent: false },
    { '#': 2, emails: 'maxdefaultman2@gmail.com', sent: false },
    { '#': 3, emails: 'maxdefaultman0@gmail.com', sent: false },
    { '#': 4, emails: 'maxdefaultman1@gmail.com', sent: false },
    { '#': 5, emails: 'maxdefaultman2@gmail.com', sent: false },
    { '#': 6, emails: 'maxdefaultman0@gmail.com', sent: false },
    { '#': 7, emails: 'maxdefaultman1@gmail.com', sent: false },
    { '#': 8, emails: 'maxdefaultman2@gmail.com', sent: false },
    { '#': 9, emails: 'maxdefaultman0@gmail.com', sent: false },
    { '#': 10, emails: 'maxdefaultman1@gmail.com', sent: false },
    { '#': 11, emails: 'maxdefaultman2@gmail.com', sent: false }
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: '#', width: 80 },
    { field: 'emails', width: 300, editable: true },
    { field: 'sent', width: 120 }
  ]);

  const undoRedoCellEditing = true;
  const undoRedoCellEditingLimit = 20;

  return (
    // wrapping container with theme & size
    <div className="ag-theme-quartz w-full h-full p-4">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection="multiple"
        undoRedoCellEditing={undoRedoCellEditing}
        undoRedoCellEditingLimit={undoRedoCellEditingLimit}
      />
    </div>
  );
};

export default Table;
