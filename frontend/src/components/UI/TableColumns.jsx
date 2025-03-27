import { useState, useEffect } from "react";

const useCreateColumns = (data) => {
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (data.length > 0) {
        const keys = Object.keys(data[0]);

        const tableColumns = keys.map((key) => ({
          name: key.toUpperCase(),
          selector: (row) => row[key],
          sortable: true,
        }));
        setColumns(tableColumns);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating tables");
    }
  }, [data]);

  return columns;
};

export default useCreateColumns;
