import React from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({
  title,
  columns,
  data,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  paginationInfo,
}) => {
  const { page, limit } = paginationInfo;

  const filteredColumns = columns.filter(
    (col) => col.name && col.name.trim().toUpperCase() !== "__CLASS__"
  );

  const formattedColumns = [
    {
      name: "S/N",
      selector: (row) => row.sn,
      sortable: true,
      width: "80px",
    },
    ...filteredColumns.map((col) => ({
      ...col,
      name: col.name.replace(/_/g, " "),
    })),
  ];

  const formattedData = data.map((item, index) => {
    const { CLASS, ...filteredItem } = item;
    return {
      sn: (page - 1) * limit + index + 1,
      ...filteredItem,
      created_at: new Date(item.created_at).toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      updated_at: new Date(item.updated_at).toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6 flex flex-col flex-grow w-full custom-table">
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-600 mb-4 border-b-2 border-gray-300 pb-2">
          {title}
        </h2>
      </div>
      <div className="flex-grow overflow-auto w-full">
        <DataTable
          columns={formattedColumns}
          data={formattedData}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationComponentOptions={{
            noRowsPerPage: false,
            rowsPerPageText: "Rows per page:",
            rangeSeparatorText: "of",
          }}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onRowsPerPageChange}
          highlightOnHover
          responsive
          noHeader
          className="w-full min-w-full"
        />
      </div>
    </div>
  );
};

export default DataTableComponent;
