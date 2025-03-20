import InputTemplate from "./InputTemplate";

const AddCategory = () => {
  const fields = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      placeholder: "Enter category name",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
  ];

  return (
    <div>
      <InputTemplate
        fields={fields}
        endpoint="/categories"
        alertMsg="Category added successfully!"
        btnText="Add Category"
        formTitle="Add New Category"
        initialValue={{}}
      />
    </div>
  );
};

export default AddCategory;
