import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

// Sample data for table
const data = [
  {
    id: 1,
    name: "Product A",
    brand: "Brand A",
    model: "Model A",
    description: "Desc A",
    sku: "A-Prod",
    price: "$10",
    stock: 20,
    category: "Category A",
    reorder_status: "OK",
  },
  {
    id: 2,
    name: "Product B",
    brand: "Brand B",
    model: "Model B",
    description: "Desc B",
    sku: "B-Prod",
    price: "$15",
    stock: 15,
    category: "Category B",
    reorder_status: "OK",
  },
  {
    id: 3,
    name: "Product C",
    brand: "Brand C",
    model: "Model C",
    description: "Desc C",
    sku: "C-Prod",
    price: "$20",
    stock: 10,
    category: "Category C",
    reorderStatus: "OK",
  },
];

// Define columns
const columns = [
  { name: "ID", selector: (row) => row.id, sortable: true },
  { name: "Name", selector: (row) => row.name, sortable: true },
  { name: "Brand", selector: (row) => row.brand, sortable: true },
  { name: "Model", selector: (row) => row.model, sortable: true },
  { name: "Desc", selector: (row) => row.desc },
  { name: "SKU", selector: (row) => row.sku },
  { name: "Price", selector: (row) => row.price, sortable: true },
  { name: "Stock", selector: (row) => row.stock, sortable: true },
  { name: "Category", selector: (row) => row.category, sortable: true },
  { name: "Reorder Status", selector: (row) => row.reorderStatus },
];

// Data Table
const TestDataTableComponent = () => {
  return (
    <div className="w-full mt4">
      <h2>Inventory Table</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

// Dynamic Data Table
const DataTableComponent = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/suppliers");
        const apiData = response.data;

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
  }, []);

  // The table
  return (
    <div>
      <h2>Inventory Table</h2>
      <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      responsive
      />
    </div>
  );
};

export default DataTableComponent;
