import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../assets/ag-grid-custom-icons.css';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';

const emailRegex = /^\S+@\S+\.\S+$/;

// Handler to sanitize the email rows
function sanitizeEmailRows(rows) {
  return (
    rows
      // Remove special characters not usually found in email addresses
      .map((row) => {
        row.emails = row.emails.replace(/[!"#$%&'()*,:;<=>?[\]^`{|}~]/g, '');
        return row;
      })
      // Remove rows with empty email
      .filter((row) => row.emails !== '')
      // Remove rows with invalid email without @
      .filter((row) => row.emails.includes('@'))
      // Add index to the rows
      .map((row, index) => ({ ...row, '#': index + 1 }))
  );
}

// Handler to check if the last row with empty email is present while editing, if not add one
function createLastRowInsertion(mailList) {
  if (mailList[mailList.length - 1].emails !== '') {
    return [...mailList, { '#': mailList.length + 1, emails: '', sent: false }];
  } else return [...mailList];
}

const Table = () => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const [gridApi, setGridApi] = useState(null);

  // Row Data, or also known as mailList
  const mailList = useStore((state) => state.mailList);
  const setMailList = useStore((state) => state.setMailList);
  const updateMailListInLocalStorage = useStore((state) => state.updateMailListInLocalStorage);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    { field: '#', width: 80 },
    { field: 'emails', width: 300, editable: true },
    { field: 'sent', width: 120, editable: true }
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
        .filter((row) => row.emails.includes('@'))
        .map((row, index) => ({ ...row, '#': currentSelection + index + 1 }));

      const newData = [...mailList];
      newData.splice(currentSelection, rows.length, ...rows);
      if (newData[newData.length - 1].emails !== '') {
        newData.push({ '#': newData.length + 1, emails: '', sent: false });
      }

      setMailList(createLastRowInsertion(sanitizeEmailRows(newData)));
    },
    [mailList, currentSelection]
  );

  // Handler to update rowData upon deletion
  const deleteSelectedRows = () => {
    const selectedData = gridApi.getSelectedRows();
    const res = mailList
      .filter((row) => !selectedData.includes(row))
      .map((row, index) => ({ ...row, '#': index + 1 }));
    // check if all rows are deleted, if yes add one empty row
    if (res.length === 0) {
      res.push({ '#': 1, emails: '', sent: false });
    }
    // check if the last row is empty, if not add one
    if (res[res.length - 1].emails !== '') {
      res.push({ '#': res.length + 1, emails: '', sent: false });
    }
    setMailList(res);
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
        onCellEditingStopped={(params) => {
          // Check if checkbox is being edited, if yes return
          if (typeof params.value === 'boolean') {
            updateMailListInLocalStorage();
            return;
          }
          // Check if the email is valid, if not revert to old value
          if (!emailRegex.test(params.value)) {
            params.node.setDataValue(params.column.colId, params.oldValue);
          }
          // Check if the last row is being edited, if yes add one more row
          if (params.rowIndex === mailList.length - 1) {
            setMailList(createLastRowInsertion(mailList));
          }
        }}
        undoRedoCellEditing={undoRedoCellEditing}
        undoRedoCellEditingLimit={undoRedoCellEditingLimit}
      />
    </div>
  );
};

export default Table;
