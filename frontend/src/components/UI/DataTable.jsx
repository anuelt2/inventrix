import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({ title, columns, data }) => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-gray-600 mb-4 border-b-2 border-gray-300 pb-2">
          {title}
        </h2>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default DataTableComponent;
