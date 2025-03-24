import React, { useEffect, useState } from "react";
import Modal from "react-modal"

import { fetchUserData } from "../../services/AuthService";



Modal.setAppElement("#root");

const TransactionForm = ({ isOpen, onClose, onSubmit }) => {
  const [transaction, setTransaction] = useState({
    transaction_type: "sale",
    user_id: "",
    supplier_id: "",
    customer_id: "",
    total_amount: 0,
    transaction_items: [],
  });


  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  useEffect(() => {
  const fetchData = async () => {
    if (isOpen) {  // Fetch data only when modal is open
      try {
        const userData = await fetchUserData();
        setTransaction((prevTransaction) => ({
          ...prevTransaction,
          user_id: userData.id,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  fetchData();
}, [isOpen]);

  // Handle Adding a New Item
  const addItem = () => {
    setTransaction({
      ...transaction,
      transaction_items: [
        ...transaction.transaction_items,
        { product_id: "", quantity: 0, unit_price: 0, total: 0 },
      ],
    });
  };

  // Handle Updating Item Fields
  const updateItem = (index, field, value) => {
    const items = [...transaction.transaction_items];
    items[index][field] = value;

    if (field === "quantity" || field === "unit_price") {
      items[index].total = items[index].quantity * items[index].unit_price;
    }

    setTransaction({ ...transaction, transaction_items: items });
  };

  // Handle Removing an Item
  const removeItem = (index) => {
    const items = transaction.transaction_items.filter((_, i) => i !== index);
    setTransaction({ ...transaction, transaction_items: items });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(transaction);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Form"
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-45 z-150"
      overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center z-150"
    >
      <div className="max-h-[60vh] overflow-y-auto p-4">
      <h2 className="text-xl font-bold text-gray-500 mb-4 z-200">Add Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type */}
        <div>
          <label className="block text-gray-700">Transaction Type</label>
          <select
            name="transaction_type"
            value={transaction.transaction_type}
            onChange={handleChange}
            className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
          >
            <option value="purchase">Purchase</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        {/* User ID */}
        <div>
          <label className="block text-gray-700">User ID</label>
          <input
            type="text"
            name="user_id"
            value={transaction.user_id}
            onChange={handleChange}
            placeholder="Enter user ID"
            readOnly
            className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
          />
        </div>

        {/* Supplier ID (Only for Purchases) */}
        {transaction.transaction_type === "purchase" && (
          <div>
            <label className="block text-gray-700">Supplier ID</label>
            <input
              type="text"
              name="supplier_id"
              value={transaction.supplier_id}
              onChange={handleChange}
              placeholder="Enter supplier ID"
              className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
            />
          </div>
        )}

        {/* Customer ID (Only for Sales) */}
        {transaction.transaction_type === "sale" && (
          <div>
            <label className="block text-gray-700">Customer ID</label>
            <input
              type="text"
              name="customer_id"
              value={transaction.customer_id}
              onChange={handleChange}
              placeholder="Enter customer ID"
              className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
            />
          </div>
        )}

        {/* Transaction Items */}
        <div>
          <label className="block text-gray-700">Transaction Items</label>
          {transaction.transaction_items.map((item, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <label className="block text-gray-700">Product ID</label>
              <input
                type="text"
                placeholder="Product ID"
                value={item.product_id}
                onChange={(e) => updateItem(index, "product_id", e.target.value)}
                className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
              />
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
              />
              <label className="block text-gray-700">Unit price ($)</label>
              <input
                type="number"
                placeholder="Unit Price ($)"
                value={item.unit_price}
                onChange={(e) => updateItem(index, "unit_price", Number(e.target.value))}
                className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
              />
              <label className="block text-gray-700">Total price ($)</label>
              <input
                type="number"
                placeholder="Total Price ($)"
                value={item.total}
                readOnly
                className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 mt-2"
              >
                Remove Item
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="text-blue-600 mt-2"
          >
            + Add Item
          </button>
        </div>

        {/* Submit & Close Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </Modal>
  );
};


const AddTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log("Transaction Data Submitted:", formData);
    // Send data to API here...
  };

  return (
    <div className="p-6 text-gray-500">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-1 bg-gray-600 text-white rounded"
      >
        Add Transaction
      </button>

      <TransactionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded shadow-md z-500"
      />
    </div>
  );
};

export default AddTransaction;
