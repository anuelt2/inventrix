import { useState } from "react";
import Modal from "react-modal";
import InputTemplate from "./InputTemplate";
import API from "../../utils/api";

Modal.setAppElement("#root");

const AddSupplier = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields = [
    {
      name: "name",
      label: "Supplier Name",
      type: "text",
      placeholder: "Enter supplier name"
    },
    {
      name: "contact_person",
      label: "Contact Person",
      type: "text",
      placeholder: "Enter supplier contact person",
      required: false
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter supplier phone number"
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter supplier email"
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter supplier address"
    },
  ];

  const handleFormSubmit = async (formData) => {
    try {
      await API.post("/suppliers", formData);
      alert("Supplier added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div className="p-6 text-gray-500">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-1 bg-gray-600 text-white rounded cursor-pointer"
      >
        Add Supplier
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Supplier Form"
        className="bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-30 z-150"
        overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center z-150"
      >
        <div className="max-h-[60vh] overflow-y-auto flex flex-col">
          <InputTemplate
            fields={fields}
            onSubmit={handleFormSubmit}
            btnText="Add Supplier"
            formTitle="Add New Supplier"
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

export default AddSupplier;
