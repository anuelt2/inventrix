import React from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";

const UsersTable = () => {
  const { data, columns, error } = useFetchData("/users");

  if (error) return <p>{error}</p>;

  return <DataTableComponent title="Users" columns={columns} data={data} />;
};

export default UsersTable;
