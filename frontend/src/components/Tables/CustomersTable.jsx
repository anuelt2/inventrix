import React, { useState, useEffect } from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";
import useCreateColumns from "../UI/TableColumns";
import LoadingWrapper from "../UI/LoadingWrapper";

const CustomersTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const { data, totalRows, error } = useFetchData("/customers", page, limit);
  
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

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
    <LoadingWrapper loading={loading}>
      <DataTableComponent
        title="Customers"
        columns={columns}
        data={data}
        totalRows={totalRows}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        paginationInfo={{ page, limit }}
        />
     </LoadingWrapper>
  );
};

export default CustomersTable;
