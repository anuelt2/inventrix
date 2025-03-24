import { useState, useEffect } from "react";

import InputTemplate from "./InputTemplate";
import API from "../../utils/api";
import Layout from "../Layout/Layout";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/categories");
        const categoryData = response.data?.data || response.data;

        // Transform API response to match the required format
        const formattedCategories = categoryData.map((cat) => ({
          value: cat.slug || cat.name.toLowerCase(),
          label: cat.name,
          id: cat.id,
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fields = [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      placeholder: "Enter product name",
    },
    {
      name: "price",
      label: "Price ($)",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      name: "brand",
      label: "Brand Name",
      type: "text",
      placeholder: "Enter brand name",
    },
    {
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Enter model",
    },
    {
      name: "stock_quantity",
      label: "Stock Quantity",
      type: "number",
      placeholder: "Enter stock quantity",
    },
    {
      name: "reorder_level",
      label: "Reorder Level",
      type: "number",
      placeholder: "Enter reoder level",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter product description",
    },
  ];

  return (
    <Layout sideBar={true}>
      <div>
        <InputTemplate
          fields={fields}
          endpoint="/products"
          alertMsg="Product added successfully!"
          btnText="Add Product"
          formTitle="Add New Product"
          initialValue={{}}
        />
      </div>
    </Layout>
  );
};

export default AddProduct;
