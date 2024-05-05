import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../assets/ag-grid-custom-icons.css';
import { useCallback, useEffect, useState } from 'react';

const Table = () => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const [gridApi, setGridApi] = useState(null);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { '#': 1, emails: 'maxdefaultman1@gmail.com', sent: true },
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
      const paste = event.clipboardData.getData('text');
      const rows = paste
        .split('\n')
        .map((emails) => emails.split('\t'))
        .map((row, index) => {
          return {
            '#': currentSelection + index + 1,
            emails: row[0].replace(/\r/g, ''),
            sent: false
          };
        });

      const newData = [...rowData];
      newData.splice(currentSelection, rows.length, ...rows);

      setRowData(newData);
    },
    [rowData, currentSelection]
  );

  // Handler to update rowData upon deletion
  const deleteSelectedRows = () => {
    const selectedData = gridApi.getSelectedRows();
    const res = rowData
      .filter((row) => !selectedData.includes(row))
      .map((row, index) => ({ ...row, '#': index + 1 }));

    setRowData(res);
    gridApi.deselectAll();
  };

  // Setup keydown listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Delete') {
        deleteSelectedRows();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gridApi, rowData]);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  // Callback to get the API
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <div className="ag-theme-quartz w-full h-full p-4">
      <AgGridReact
        onGridReady={onGridReady}
        rowData={rowData}
        columnDefs={colDefs}
        onCellClicked={(params) => {
          setCurrentSelection(params.rowIndex);
        }}
        rowSelection="multiple"
        undoRedoCellEditing={undoRedoCellEditing}
        undoRedoCellEditingLimit={undoRedoCellEditingLimit}
      />
    </div>
  );
};

export default Table;
