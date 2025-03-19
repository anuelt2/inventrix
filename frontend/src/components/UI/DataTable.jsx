import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({ title, columns, data }) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
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
