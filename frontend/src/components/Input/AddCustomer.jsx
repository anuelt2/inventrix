import { useState } from "react";
import Modal from "react-modal";
import InputTemplate from "./InputTemplate";

// Set root element for accessibility
Modal.setAppElement("#root");

const AddCustomer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields = [
    {
      name: "name",
      label: "Customer Name",
      type: "text",
      placeholder: "Enter customer name",
      required: false
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter customer phone number",
      required: false
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter customer email",
      required: false
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter customer address",
      required: false
    },
  ];

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      await API.post("/customers", formData);
      alert("Customer added successfully!");
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="p-6 text-gray-500">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-1 bg-gray-600 text-white rounded cursor-pointer"
      >
        Add Customer
      </button>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Customer Form"
        className="bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-30 z-150"
        overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center z-150"
      >
        <div className="max-h-[60vh] overflow-y-auto flex flex-col">
          <InputTemplate
            fields={fields}
            onSubmit={handleFormSubmit}
            btnText="Add Customer"
            formTitle="Add New Customer"
            initialValue={{}}
          />

          <div className="flex justify-end">
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

export default AddCustomer;
