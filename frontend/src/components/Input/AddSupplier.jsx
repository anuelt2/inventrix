import InputTemplate from "./InputTemplate";
import Layout from "../Layout/Layout";

const AddSupplier = () => {
  const fields = [
    {
      name: "name",
      label: "Supplier Name",
      type: "text",
      placeholder: "Enter supplier name",
    },
    {
      name: "contact_person",
      label: "Contact Person",
      type: "text",
      placeholder: "Enter supplier contact person",
      required: false,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter supplier phone number",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter supplier email",
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter supplier address",
    },
  ];

  return (
    <Layout sideBar={true}>
      <div>
        <InputTemplate
          fields={fields}
          endpoint="/suppliers"
          alertMsg="Supplier added successfully!"
          btnText="Add Supplier"
          formTitle="Add New Supplier"
          initialValue={{}}
        />
      </div>
    </Layout>
  );
};

export default AddSupplier;
