import React, { useState, useEffect, useContext } from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";

const SuppliersTable = () => {
  const { data, columns, error } = useFetchData("/suppliers");

  if (error) return <p>{error}</p>;

  return <DataTableComponent title="Suppliers" columns={columns} data={data} />;
};

export default SuppliersTable;
