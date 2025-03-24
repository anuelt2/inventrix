import InputTemplate from "./InputTemplate";
import Layout from "../Layout/Layout";

const AddCustomer = () => {
  const fields = [
    {
      name: "name",
      label: "Customer Name",
      type: "text",
      placeholder: "Enter customer name",
      required: false,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter customer phone number",
      required: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter customer email",
      required: false,
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter customer address",
      required: false,
    },
  ];

  return (
    <Layout sideBar={true}>
      <div>
        <InputTemplate
          fields={fields}
          endpoint="/customers"
          alertMsg="Customer added successfully!"
          btnText="Add Customer"
          formTitle="Add New Customer"
          initialValue={{}}
        />
      </div>
    </Layout>
  );
};

export default AddCustomer;
