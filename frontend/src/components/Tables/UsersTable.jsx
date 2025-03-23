import React, { useState } from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";
import useCreateColumns from "../UI/TableColumns";

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, totalRows, error } = useFetchData("/users", page, limit);
  const columns = useCreateColumns(data);

  if (error) return <p>{error}</p>;

  // Update state when user changes pages
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Update state when user changes rows per page
  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <DataTableComponent
      title="Users"
      columns={columns}
      data={data}
      totalRows={totalRows}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      paginationInfo={{ page, limit }}
    />
  );
};

export default UsersTable;
