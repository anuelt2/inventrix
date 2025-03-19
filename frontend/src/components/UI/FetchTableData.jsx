import { useState, useEffect, useContext } from "react";

import API from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

const useFetchData = (endpoint) => {
  const { accessToken } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const apiData = response.data.data;

        if (apiData.length > 0) {
          const keys = Object.keys(apiData[0]);

          const tableColumns = keys.map((key) => ({
            name: key.toUpperCase(),
            selector: (row) => row[key],
            sortable: true,
          }));
          setColumns(tableColumns);
        }

        setData(Array.isArray(apiData) ? apiData : []);
      } catch (error) {
        setError(error.response?.data?.message || "Error loading table");
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, columns, error };
};

export default useFetchData;
