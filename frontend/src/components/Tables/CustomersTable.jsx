import React from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";

const CustomersTable = () => {
  const { data, columns, error } = useFetchData("/customers");

  if (error) return <p>{error}</p>;

  return <DataTableComponent title="Customers" columns={columns} data={data} />;
};

export default CustomersTable;
