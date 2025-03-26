import { useState, useEffect } from "react";
import Modal from "react-modal";
import InputTemplate from "./InputTemplate";
import API from "../../utils/api";

// Set root element for accessibility
Modal.setAppElement("#root");

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await API.get("/stats");
        const total = resp.data.products; 
        const response = await API.get(`/categories?limit=${total}`);
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
      placeholder: "Enter product name"
    },
    {
      name: "price",
      label: "Price ($)",
      type: "number",
      placeholder: "Enter product price"
    },
    {
      name: "brand",
      label: "Brand Name",
      type: "text",
      placeholder: "Enter brand name"
    },
    {
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Enter model"
    },
    {
      name: "stock_quantity",
      label: "Stock Quantity",
      type: "number",
      placeholder: "Enter stock quantity"
    },
    {
      name: "reorder_level",
      label: "Reorder Level",
      type: "number",
      placeholder: "Enter reorder level"
    },
    {
      name: "category_id",
      label: "Category",
      type: "select",
      options: categories
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter product description"
    },
  ];

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      await API.post("/products", formData);
      alert("Product added successfully!");
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
      <div className="p-6 text-gray-700">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1 bg-gray-600 text-white rounded cursor-pointer"
        >
          Add Product
        </button>

      {/* Modal Form */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Add Product Form"
          className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-30 z-150"
          overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center z-150"
        >
        <div className="max-h-[55vh] overflow-y-auto rounded-lg bg-white p-10 flex flex-col">
            <InputTemplate
              fields={fields}
              onSubmit={handleFormSubmit}
              btnText="Add Product"
              formTitle="Add New Product"
              initialValue={{}}
    
            />

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
  );
};

export default AddProduct;
