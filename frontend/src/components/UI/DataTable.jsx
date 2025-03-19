import React from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({ title, columns, data }) => {
  const formattedData = data.map((item, index) => ({
    sn: index + 1,
    ...item,
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
  }));

  const formattedColumns = [
    {
      name: "S/N",
      selector: (row) => row.sn,
      sortable: true,
      width: "80px",
    },
    // filter does not seem to be working yet
    ...columns
      .filter((col) => col.name !== "CLASS" && col.selector !== "__CLASS__")
      .map((col) => ({
        ...col,
        name: col.name.replace(/_/g, " "),
      })),
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-600 mb-4 border-b-2 border-gray-300 pb-2">
          {title}
        </h2>
      </div>
      <div className="max-h-[500px] overflow-y-auto">
        <DataTable
          columns={formattedColumns}
          data={formattedData}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default DataTableComponent;
