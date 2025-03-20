import React from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";

const ProductsTable = () => {
  const { data, columns, error } = useFetchData("/products");

  if (error) return <p>{error}</p>;

  return <DataTableComponent title="Products" columns={columns} data={data} />;
};

export default ProductsTable;
