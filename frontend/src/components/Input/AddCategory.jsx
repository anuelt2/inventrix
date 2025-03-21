import InputTemplate from "./InputTemplate";
import Layout from "../Layout/Layout";

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
    <Layout sideBar={true}>
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
    </Layout>
  );
};

export default AddCategory;
