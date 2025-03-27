import { useState, useEffect, useContext } from "react";

import API from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

const useFetchData = (endpoint, page, limit) => {
  const { accessToken } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    if (!page || !limit) return;

    const fetchData = async () => {
      try {
        const response = await API.get(endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { page, limit },
        });

        const apiData = response.data.data;

        setData(Array.isArray(apiData) ? apiData : []);
        setTotalRows(response.data.total || 0);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching data");
      } finally {
      }
    };

    fetchData();
  }, [endpoint, page, limit]);

  return { data, totalRows, error };
};

export default useFetchData;
