import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../assets/ag-grid-custom-icons.css';
import { useCallback, useEffect, useState } from 'react'; // Optional Theme applied to the grid

const Table = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(0);

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
  const colDefs = [
    { field: '#', width: 80 },
    { field: 'emails', width: 300, editable: true },
    { field: 'sent', width: 120 }
  ];

  const undoRedoCellEditing = true;
  const undoRedoCellEditingLimit = 20;

  const handlePaste = useCallback(
    (event) => {
      if (!isEditing) return;

      const paste = event.clipboardData.getData('text');
      const rows = paste
        .split('\n')
        .map((emails) => emails.split('\t'))
        .map((row, index) => {
          return {
            '#': currentSelection + index,
            emails: row[0].replace(/\r/g, ''),
            sent: false
          };
        });

      const newData = [...rowData];
      newData.splice(currentSelection, rows.length, ...rows);

      setRowData(newData);
    },
    [rowData, isEditing]
  );

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return (
    <div className="ag-theme-quartz w-full h-full p-4">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellEditingStarted={(params) => {
          setCurrentSelection(params.rowIndex);
          setIsEditing(true);
        }}
        onCellEditingStopped={() => setIsEditing(false)}
        rowSelection="multiple"
        undoRedoCellEditing={undoRedoCellEditing}
        undoRedoCellEditingLimit={undoRedoCellEditingLimit}
      />
    </div>
  );
};

export default Table;
