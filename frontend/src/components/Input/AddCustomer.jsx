import InputTemplate from "./InputTemplate";

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
  );
};

export default AddCustomer;
