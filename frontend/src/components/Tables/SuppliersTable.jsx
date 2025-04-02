import React, { useState, useEffect } from "react";
import DataTableComponent from "../UI/DataTable";
import useFetchData from "../UI/FetchTableData";
import useCreateColumns from "../UI/TableColumns";
import LoadingWrapper from "../UI/LoadingWrapper";
import { useAuth } from "../../context/AuthContext";

const SuppliersTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const { data, totalRows, error } = useFetchData("/suppliers", page, limit);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (data && accessToken) {
      setLoading(false);
    }
  }, [data, accessToken]);

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
        title="Suppliers"
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

export default SuppliersTable;
