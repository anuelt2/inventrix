import InputTemplate from "./InputTemplate";


const AddProduct = () => {
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
        name: "category",
        label: "Category",
        type: "select",
        options: [
          {
            value: "electronics",
            label: "Electronics",
            id: 1
          },
          {
            value: "clothing",
            label: "Clothing",
            id: 2
          },
          {
            value: "food",
            label: "Food",
            id: 3
          }
        ]
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter product description"
      },
    ];

    return (
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
    );
}


export default AddProduct;