import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../assets/ag-grid-custom-icons.css';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';

const Table = () => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const [gridApi, setGridApi] = useState(null);

  // Row Data, or also known as mailList
  const mailList = useStore((state) => state.mailList);
  const setMailList = useStore((state) => state.setMailList);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    { field: '#', width: 80 },
    { field: 'emails', width: 300, editable: true },
    { field: 'sent', width: 120 }
  ];

  const undoRedoCellEditing = true;
  const undoRedoCellEditingLimit = 20;

  // Handler to update rowData upon bulk paste
  const handlePaste = useCallback(
    (event) => {
      const paste = event.clipboardData.getData('text');
      const rows = paste
        .split('\n')
        .map((emails) => emails.split('\t'))
        .map((row) => {
          return {
            emails: row[0].replace(/\r/g, ''),
            sent: false
          };
        })
        .filter((row) => row.emails !== '')
        .map((row, index) => ({ ...row, '#': currentSelection + index + 1 }));

      const newData = [...mailList];
      newData.splice(currentSelection, rows.length, ...rows);
      if (newData[newData.length - 1].emails !== '') {
        newData.push({ '#': newData.length + 1, emails: '', sent: false });
      }

      setMailList(newData);
    },
    [mailList, currentSelection]
  );

  // Handler to update rowData upon deletion
  const deleteSelectedRows = () => {
    const selectedData = gridApi.getSelectedRows();
    const res = mailList
      .filter((row) => !selectedData.includes(row))
      .map((row, index) => ({ ...row, '#': index + 1 }));
    if (res.length === 0) {
      res.push({ '#': 1, emails: '', sent: false });
    }
    setMailList(res);
    gridApi.deselectAll();
  };

  // Handler to check if the last row with empty email is present, if not add one
  const handleLastRowInsertion = (selectedRowIndex) => {
    if (selectedRowIndex === mailList.length - 1 && mailList[mailList.length - 1].emails !== '') {
      const newData = [...mailList, { '#': mailList.length + 1, emails: '', sent: false }];
      setMailList(newData);
    }
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
  }, [gridApi, mailList]);

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
        rowData={mailList}
        columnDefs={colDefs}
        onCellClicked={(params) => {
          setCurrentSelection(params.rowIndex);
        }}
        rowSelection="multiple"
        onCellEditingStopped={(params) => handleLastRowInsertion(params.rowIndex)}
        undoRedoCellEditing={undoRedoCellEditing}
        undoRedoCellEditingLimit={undoRedoCellEditingLimit}
      />
    </div>
  );
};

export default Table;
