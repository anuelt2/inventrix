import InputTemplate from "./InputTemplate";


const AddTransaction = () => {
    
   const fields = [
  {
    name: "transaction_type",
    label: "Transaction Type",
    type: "select",
    options: [
      { value: "purchase", label: "Purchase" },
      { value: "sale", label: "Sale" }
    ],
  },
  {
    name: "user_id",
    label: "User ID",
    type: "text",
    placeholder: "Enter user ID",
  },
  {
    name: "supplier_id",
    label: "Supplier ID",
    type: "text",
    placeholder: "Enter supplier ID (Required for purchases)",
    conditional: { field: "transaction_type", value: "purchase" }, // Show only for purchases
  },
  {
    name: "customer_id",
    label: "Customer ID",
    type: "text",
    placeholder: "Enter customer ID (Required for sales)",
    conditional: { field: "transaction_type", value: "sale" }, // Show only for sales
  },
  {
    name: "total_amount",
    label: "Total Amount ($)",
    type: "number",
    placeholder: "Enter total transaction amount",
  },
  {
    name: "transaction_items",
    label: "Transaction Items",
    type: "array",
    fields: [
      {
        name: "product_id",
        label: "Product ID",
        type: "text",
        placeholder: "Enter product ID",
      },
      {
        name: "quantity",
        label: "Quantity",
        type: "number",
        placeholder: "Enter quantity",
      },
      {
        name: "transaction_items",
        label: "Transaction Items",
        type: "list",
        fields: [
        {
            name: "product_id",
            label: "Product ID",
            type: "text",
            placeholder: "Enter product ID",
        },
        {
            name: "quantity",
            label: "Quantity",
            type: "number",
            placeholder: "Enter quantity",
        },
        {
            name: "unit_price",
            label: "Unit Price ($)",
            type: "number",
            placeholder: "Enter unit price",
        },
        {
            name: "total",
            label: "Total Price ($)",
            type: "number",
            placeholder: "Auto-calculated total",
            readonly: true, // Calculated as quantity * unit_price
        }
        ]
      },
      {
        name: "unit_price",
        label: "Unit Price ($)",
        type: "number",
        placeholder: "Enter unit price",
      }
    ]
  }
];

    return (
      <div>
            <InputTemplate
                fields={fields}
                endpoint="/transaction"
                alertMsg="Transaction added successfully!"
                btnText="Add Transaction"
                formTitle="Add Transaction"
                initialValue={{}}
            />
      </div>
    );
}


export default AddTransaction;