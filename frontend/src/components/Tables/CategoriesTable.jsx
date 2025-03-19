import React from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";

const CategoriesTable = () => {
  const { data, columns, error } = useFetchData("/categories");

  if (error) return <p>{error}</p>;

  return (
    <DataTableComponent title="Categories" columns={columns} data={data} />
  );
};

export default CategoriesTable;
