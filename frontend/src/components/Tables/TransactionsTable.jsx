import React from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";

const TransactionsTable = () => {
  const { data, columns, error } = useFetchData("/transactions");

  if (error) return <p>{error}</p>;

  return (
    <DataTableComponent title="Transactions" columns={columns} data={data} />
  );
};

export default TransactionsTable;
